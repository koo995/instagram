from django.db import models
from django.conf import settings
from django.urls import reverse
from django.shortcuts import resolve_url
import re

# Create your models here.


class TimeStampedModel(
    models.Model
):  # 매번 모델들에 똑같은 필드를 넣는것이 번거롭다면 공통이 되는 필드를 가진 부모클래스를 만들어서 상속받도록해줌
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True  # 부모로써만 존재하고 따로 데이터테이블은 만들어지지 않는다. 따로 생성이 안된다.


# user
#  -> Post.objects.filter(author=user)
#  -> user.post_set.all()
class Post(TimeStampedModel):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="my_post_set",  # 여기서 like_user_set의 related_name과 충돌이 일어날수있으니까 변경해 준다. user.my_post_set을 이용해서 뽑아낼 수 있다.
        on_delete=models.CASCADE,
    )
    photo = models.ImageField(upload_to="instagram/post/%Y/%m/%d")
    caption = models.CharField(max_length=500)
    tag_set = models.ManyToManyField("Tag", blank=True)
    location = models.CharField(max_length=100)
    like_user_set = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name="like_post_set"
    )  # 양쪽다 바꿔준다. user.like_post_set을 이용해서 뽑아낼 수 있다.
    # related_name은 참조해준 객체의 입장에서 설정해줘야 한다.

    def __str__(self):
        return self.caption

    def get_absolute_url(self):
        return reverse("instagram:post_detail", kwargs={"pk": self.pk})

    def extract_tag_list(self):
        tag_name_list = re.findall(r"#([a-zA-Z\dㄱ-힣]+)", self.caption)
        tag_list = []
        for tag_name in tag_name_list:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            tag_list.append(tag)
        return tag_list

    def is_like_user(self, user):
        return self.like_user_set.filter(pk=user.pk).exists()

    class Meta:
        ordering = ["-id"]


class Comment(TimeStampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    message = models.TextField()

    class Meta:
        ordering = ["-id"]


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


# class Post(BaseModel):
#     author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='my_post_set',
#                                on_delete=models.CASCADE)
#     photo = models.ImageField(upload_to="instagram/post/%Y/%m/%d")
#     caption = models.CharField(max_length=500)
#     tag_set = models.ManyToManyField('Tag', blank=True)
#     location = models.CharField(max_length=100)
#     like_user_set = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True,
#                                            related_name='like_post_set')
