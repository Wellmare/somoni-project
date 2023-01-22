from django.urls import path

from userprofile import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('profile/', views.profile.as_view()),
    path('edit-profile/', views.edit_profile.as_view()),
    path('user-info/<int:pk>/', views.getprofile),
    path('email', views.send_email),
    path("password_reset/", auth_views.PasswordResetView.as_view(), name="password_reset"),
    path("password_reset/done/", auth_views.PasswordResetDoneView.as_view(), name="password_reset_done"),
    path("reset/<uidb64>/<token>/", auth_views.PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    path("reset/done/", auth_views.PasswordResetCompleteView.as_view(), name="password_reset_complete"),
]
