from django.urls import path


from userprofile import views




urlpatterns = [
    path('profile/', views.profile.as_view()),
]
