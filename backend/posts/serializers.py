from rest_framework import serializers
from .models import Post, Tag


class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source="author.username")
    tags = serializers.SerializerMethodField()
    tag_names = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "content",
            "tag_names",
            "tags",
            "created_at",
            "updated_at",
            "author_username",
        ]

    def get_tags(self, obj):
        return [tag.name for tag in obj.tags.all()]

    def create(self, validated_data):
        tag_names = validated_data.pop("tag_names", [])
        post = Post.objects.create(**validated_data)
        for name in tag_names:
            tag, _ = Tag.objects.get_or_create(name=name.lower())
            post.tags.add(tag)
        return post

    def update(self, instance, validated_data):
        tag_names = validated_data.pop("tag_names", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if tag_names is not None:
            instance.tags.clear()
            for name in tag_names:
                tag, _ = Tag.objects.get_or_create(name=name.lower())
                instance.tags.add(tag)
        instance.save()
        return instance
