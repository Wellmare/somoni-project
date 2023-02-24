from rest_framework import serializers

from .models import Notification


class notifications_serializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('html', 'id', 'isRead', 'date')
        read_only_fields = ('html', 'id', 'isRead', 'date')
