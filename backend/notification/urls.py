from django.urls import path

from . import views


urlpatterns = [
    path('notification/<int:id>/read', views.Read),
    path('notification/read-all', views.ReadAll),
]
