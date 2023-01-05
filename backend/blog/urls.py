from django.urls import path, include
from rest_framework import routers

from blog import views




urlpatterns = [
    path('posts/', views.get_create_post.as_view()),
    path('post/<int:pk>', views.post_detail_view.as_view())
]
