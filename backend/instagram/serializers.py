from rest_framework import serializers
from .models import Post, Comment
from django.contrib.auth import get_user_model


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["username", "avatar", "name"]


class PostSerializer(serializers.ModelSerializer):
    # 디폴트 값은 author가 pk로 api에 보여진다. 그런데 이런식으로 구성하니 author에 관한 모든 정보가 나오네?
    author = AuthorSerializer(read_only=True)  # 여거래가면 many을 지정해 준다?
    is_like = serializers.SerializerMethodField("is_like_field")

    def is_like_field(self, post):
        if "request" in self.context:
            user = self.context["request"].user
            return post.like_user_set.filter(pk=user.pk).exists()
        return False

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "created_at",
            "photo",
            "caption",
            "location",
            "tag_set",
            "is_like",
        ]


class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "author", "message", "created_at"]
