from django.contrib import admin

# Register your models here.
from notification.models import Notification

admin.site.register(Notification)