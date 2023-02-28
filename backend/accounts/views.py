from django.contrib.auth import get_user_model  # user모델이 바뀔수있으니 항상 이렇게?
from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import AllowAny
from .serializers import SignupSerializer, SuggestionUserSerializer


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
