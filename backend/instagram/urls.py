from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include


router = DefaultRouter()
router.register(
    "posts", views.PostViewSet
)  # 이렇게 등록이되면 router.url을 통해 현재 라우터에 등록이 된 여러 뷰셋에대한 url이 나오게 된다.
router.register(r"posts/(?P<post_pk>\d+)/comments", views.CommentViewSet)

# router.register(
#     "comments", views.CommentViewSet
# )  # 단순히 api/comment 주소로 타고가는 것 보단 우리는 api/posts/1/comment 이런식으로 타고들어가는것을 원한다

urlpatterns = [path("api/", include(router.urls))]
