from django.urls import path

from userprofile import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('profile/', views.profile.as_view()),
    path('edit-profile/', views.edit_profile.as_view()),
    path('user-info/<int:pk>/', views.getprofile),
    path('email/', views.send_email),
]
