from django.shortcuts import render

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
from .permissions import IsAuthorOrReadOnly


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    # Filtering
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["tags", "author__username"]
    search_fields = ["title", "content"]
    ordering_fields = ["created_at", "updated_at"]
    # Permissions
    permission_classes = [IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    # Custom action to get posts by the authenticated user
    @action(
        detail=False,
        methods=["get"],
        url_path="my-posts",
        permission_classes=[IsAuthenticated],
    )
    def my_posts(self, request):
        posts = Post.objects.filter(author=request.user).order_by("-created_at")
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
