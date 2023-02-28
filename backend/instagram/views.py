from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Post
from .serializers import PostSerializer
from rest_framework.permissions import AllowAny
from django.db.models import Q
from django.utils import timezone


# Create your views here.
# ViewSet은 crud가 모두 들어간 그런 api을 만들어줌
class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
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
