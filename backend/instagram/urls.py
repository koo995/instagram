from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include


router = DefaultRouter()
router.register(
    "posts", views.PostViewSet
)  # 이렇게 등록이되면 router.url을 통해 현재 라우터에 등록이 된 여러 뷰셋에대한 url이 나오게 된다.

urlpatterns = [path("api/", include(router.urls))]
