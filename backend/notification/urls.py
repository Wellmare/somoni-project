import django_eventstream
from django.urls import path, include

from . import views
from django.urls import path

urlpatterns = [
    path('notification/<int:id>/read/', views.Read),
    path('notifications/read-all/', views.ReadAll),
    path('notifications/connect/<int:id>/', views.stream, name='stream'),
    path('notifications/last/', views.get_notifications_last.as_view()),
    path('notifications/all/', views.get_notifications_all.as_view()),

]
