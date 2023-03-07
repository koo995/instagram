from django.shortcuts import render, get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from rest_framework.permissions import AllowAny
from django.db.models import Q
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.response import Response


# Create your views here.
# ViewSet은 crud가 모두 들어간 그런 api을 만들어줌
class PostViewSet(ModelViewSet):
    queryset = (
        Post.objects.all()
        .select_related("author")
        .prefetch_related("tag_set", "like_user_set")
    )
    serializer_class = PostSerializer
    # permission_classes = [AllowAny]  # FIXME: 인증 적용

    def get_queryset(self):  # 이 멤버함수를 재정의한다
        # timesince = timezone.now() - timedelta(days=3)
        qs = super().get_queryset()
        qs = qs.filter(
            Q(author=self.request.user)  # 현재의 유저가 작성한 글이거나
            | Q(author__in=self.request.user.following_set.all())  # 유저가 팔로잉하고 있는 글이거나
        )
        # qs = qs.filter(created_at__gte=timesince) #필터를 여러개 체이닝을해도 and조건으로 들어간다
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)

    @action(detail=True, methods=["POST"])  # 특정항목을 찍을것이니까 detail을 해준다
    def like(self, request, pk):
        post = self.get_object()
        post.like_user_set.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

    @like.mapping.delete
    def unlike(self, request, pk):
        post = self.get_object()
        post.like_user_set.remove(self.request.user)
        return Response(status.HTTP_204_NO_CONTENT)


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    #     def get_serializer_context(self):
    #         context = super().get_serializer_context()
    #         context["request"] = self.request
    #         return context

    def get_queryset(self):  # post_pk인자를 받아서 기본 query_set을 반영해 줘야한다
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs["post_pk"])
        return qs

    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs["post_pk"])
        serializer.save(author=self.request.user, post=post)
        return super().perform_create(serializer)
