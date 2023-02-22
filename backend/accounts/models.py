from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

#유저모델은 필히 프로젝트 초반에 만들어 주는 것이 좋다.
# Create your models here.
class User(AbstractUser): #이것으로 모델을 바꿧는데 admin페이지에서 유저페이지에 url과 bio가 추가된다.
    class GenderChoices(models.TextChoices):
        MALE = "M", "Male" #순서대로 db에 저장되는값 실제보여지는값
        FEMALE = "F", "Female"
        
    follower_set = models.ManyToManyField("self", blank=True) #보통 첫번째 인자로 클래스를 받던데 이녀석은 self을 받아가네
    following_set = models.ManyToManyField("self", blank=True)

    
    website_url = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    phone_number = models.CharField(max_length=13, blank=True,
                                    validators=[RegexValidator(r"^010-?[1-9]\d{3}-?\d{4}$")])
    gender = models.CharField(max_length=1, blank=True, choices=GenderChoices.choices) #모든 모델필드에는 choices라는 필드값을 넣을 수가 있다.
    avatar = models.ImageField(blank=True, upload_to="accounts/avatar/%Y/%m/%d")
    
    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"
    