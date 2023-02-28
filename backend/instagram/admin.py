from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Post, Comment, Tag

# Register your models here.
# admin.site.register(User)


# 위에 방식으로 해도 되지만 이렇게 하면 좀더 커스텀하기에 좋다
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["photo_tag", "caption", "author"]
    list_display_links = ["caption"]  # 캡션에 링크를 만든다

    # 모델에 함수를 만들어도 되고 어드민에 함수를 만들어도 된다.
    # list_display에 지정한 녀석중 어드민에서 지정한 함수일 경우... self은 파이썬이 알아서 넣어주고 관련인스턴스(post)가 넘어간다.
    def photo_tag(self, post):
        # return post.photo.url  # 풀로 url이 표현된다. 이렇게 해줘야 한다? 반드시?
        return mark_safe(
            f"<img src={post.photo.url} style='width: 100px;' />"
        )  # 원본을 그대로 표현? 보안을 위해서?

    pass


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass
