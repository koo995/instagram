from django.contrib.auth import get_user_model  # user모델이 바뀔수있으니 항상 이렇게?
from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, get_object_or_404
from rest_framework.permissions import AllowAny
from .serializers import SignupSerializer, SuggestionUserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.
class SignupView(CreateAPIView):
    model = get_user_model()
    serializer_class = SignupSerializer
    permission_classes = [
        AllowAny,
    ]
    pass


class SuggestionListAPIView(ListAPIView):  # ListAPIView의 기능에 대해서 더 알아보자
    queryset = get_user_model().objects.all()  # get_user_model을 통해 뭘 얻어오지? 현재 객체?
    serializer_class = SuggestionUserSerializer
    permission_classes = [
        AllowAny,
    ]  # 여기에서 permission이 없으면 아무것도 안뜨는 이유는?

    def get_queryset(self):
        qs = (
            super()
            .get_queryset()
            .exclude(pk=self.request.user.pk)
            .exclude(pk__in=self.request.user.following_set.all())
        )
        return qs


@api_view(["POST"])  # 함수로 구현할때는 필히 장식자로 꾸며줘야함 어떤 메소드로 사용될지도
def user_follow(request):
    username = request.data["username"]
    follow_user = get_object_or_404(get_user_model(), username=username, is_active=True)
    request.user.following_set.add(follow_user)
    follow_user.follower_set.add(request.user)
    return Response(status.HTTP_204_NO_CONTENT)  # 항상 Response로 return해줘야 한다?


@api_view(["POST"])
def user_unfollow(request):
    username = request.data["username"]
    follow_user = get_object_or_404(get_user_model(), username=username)
    request.user.following_set.remove(follow_user)
    follow_user.follower_set.remove(request.user)
    return Response(status.HTTP_204_NO_CONTENT)  # 항상 Response로 return해줘야 한다?
