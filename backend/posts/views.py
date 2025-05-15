from django.shortcuts import render

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, filters
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
