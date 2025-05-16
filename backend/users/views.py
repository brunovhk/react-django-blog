from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from rest_framework import status
from django.contrib.auth.models import User
from posts.models import Post
from comments.models import Comment
from .serializers import RegisterSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class AuthorStatsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, username):
        user = User.objects.filter(username=username).first()
        if not user:
            return Response({"detail": "User not found"}, status=404)

        return Response(
            {
                "username": user.username,
                "total_posts": user.posts.count(),
                "total_comments": Comment.objects.filter(
                    author=user, is_approved=True
                ).count(),
                "posts": [
                    {"id": p.id, "title": p.title, "created_at": p.created_at}
                    for p in user.posts.order_by("-created_at")
                ],
            }
        )


class UserMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "date_joined": user.date_joined,
            },
            status=status.HTTP_200_OK,
        )
