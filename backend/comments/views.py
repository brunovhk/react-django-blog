from rest_framework import viewsets, permissions
from .models import Comment
from .serializers import CommentSerializer
from posts.permissions import IsAuthorOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

# Swagger
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.filter(is_approved=True).select_related("author", "post")
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["post"]

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                "post",
                openapi.IN_QUERY,
                description="Filter comments by post ID",
                type=openapi.TYPE_INTEGER,
            )
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
