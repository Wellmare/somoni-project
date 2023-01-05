from django.urls import path, include
from rest_framework import routers

from blog import views

router = routers.DefaultRouter()
router.register(r'views', views.PostViewSet)
router.register(r'create', views.CreatePostViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('posts/', views.get_create_post.as_view()),
    path('post/<int:pk>', views.post_detail_view.as_view())
]
