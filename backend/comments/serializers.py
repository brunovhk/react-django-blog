from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    author_username = serializers.ReadOnlyField(source="author.username")

    class Meta:
        model = Comment
        fields = [
            "id",
            "post",
            "author_username",
            "content",
            "parent",
            "replies",
            "is_approved",
            "created_at",
        ]
        read_only_fields = ["author_username", "is_approved"]

    def get_replies(self, obj):
        if obj.replies.exists():
            return CommentSerializer(
                obj.replies.filter(is_approved=True), many=True
            ).data
        return []
