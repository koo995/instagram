"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

# from django.conf.urls import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "accounts/", include("accounts.urls")
    ),  # 이 말은 accounts의 주소로 오는 것은 accounts.urls와 합치겠다라는 말? 모든 요청을 보내겠다는게 아니다?
    path("", include("instagram.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # url 로 시작하는 요청이 오면 root경로에서 찾는다

    import debug_toolbar

    urlpatterns += [path("__debug__", include(debug_toolbar.urls))]
