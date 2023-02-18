from django.urls import path

from userprofile import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('profile/', views.profile.as_view()),
    path('edit-profile/', views.edit_profile.as_view()),
    path('user-info/<int:pk>/', views.getprofile),
    path('email/', views.send_email),
    path('user/<int:id>/follow/', views.follow),
    path('user/<int:id>/following/', views.following_list.as_view()),
    path('user/<int:id>/followers/', views.followers_list.as_view()),

]
