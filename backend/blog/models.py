from PIL import Image
from taggit.managers import TaggableManager

from myapi.models import User
from django.db import models

from django.utils import timezone

from django.urls import reverse


# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    author = models.ForeignKey(User, default=15, on_delete=models.SET_DEFAULT)
    likes = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    image = models.ImageField(upload_to='post_images', null=True, blank=True)
    date = models.DateTimeField(default=timezone.now)
    tags = TaggableManager(blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super(Post, self).save(*args, **kwargs)
        try:
            img = Image.open(self.image.path)

            if img.height > 1300 or img.width > 1300:
                output_size = (1300, 1300)
                img.thumbnail(output_size)
                img.save(self.image.path)
        except ValueError:
            pass


class PostLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='post_likes')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likePost')


class Comments(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, default=15, on_delete=models.SET_DEFAULT)
    date = models.DateTimeField(default=timezone.now)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='link')
    def __str__(self):
        return self.content