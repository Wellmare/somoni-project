from django.shortcuts import render, get_object_or_404

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from django.db.models.signals import post_save
from django.dispatch import receiver

from  blog.models import Post, Comments, PostLike

import blog.models
from .models import Notification
from myapi.models import User
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Read(request, id):
    notification = get_object_or_404(Notification, id=id)
    notification.isRead = True
    notification.save()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ReadAll(request):
    notifications = Notification.objects.filter(recipient=request.user)
    for notification in notifications:
        notification.isRead = True
        notification.save()
    return Response({'all notifications is read'})


