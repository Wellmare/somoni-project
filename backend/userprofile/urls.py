from django.urls import path


from userprofile import views




urlpatterns = [
    path('profile/', views.profile.as_view()),
    path('edit-profile/', views.edit_profile.as_view()),
    path('user-info/<int:pk>', views.getprofile),
]
