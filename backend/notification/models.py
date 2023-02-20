from django.db import models

# Create your models here.
from django.utils import timezone
from myapi.models import User

class Notification(models.Model):
    html = models.CharField(max_length=500)
    date = models.DateTimeField(default=timezone.now)
    isRead = models.BooleanField(default=False)
    recipient = models.ForeignKey(User, on_delete=models.CASCADE)