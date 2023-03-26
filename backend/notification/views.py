import json
import time

from django.shortcuts import render, get_object_or_404
from rest_framework import generics

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Notification
from myapi.models import User
import time
from django.http import StreamingHttpResponse
from .serializer import notifications_serializer
from rest_framework.renderers import JSONRenderer

import json


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Read(request, id):
    notification = get_object_or_404(Notification, id=id)
    notification.isRead = True
    notification.save()
    return Response({'notification is read'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ReadAll(request):
    notifications = Notification.objects.filter(recipient=request.user)
    for notification in notifications:
        notification.isRead = True
        notification.save()
    return Response({'all notifications is read'})


class get_notifications_last(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = notifications_serializer
    queryset = Notification.objects.none()

    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user).order_by('-date')[0:10]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class get_notifications_all(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = notifications_serializer
    queryset = Notification.objects.none()

    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user).order_by('-date')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


@permission_classes([IsAuthenticated])
def stream(request, id):
    def event_stream():
        user = get_object_or_404(User, id=id)
        notifications = Notification.objects.filter(recipient=user, sent=False)
        for a in notifications:
            a.sent = True
            a.save()
        while True:
            time.sleep(1)
            notification = Notification.objects.filter(recipient=user, sent=False).first()
            if notification:
                serializer = notifications_serializer(notification, many=False)
                notification.sent = True
                notification.save()
                return f'data:  {json.dumps(serializer.data)}\n\n'

    return StreamingHttpResponse(event_stream(), content_type='text/event-stream')
