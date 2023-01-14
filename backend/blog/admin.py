from django.contrib import admin

# Register your models here.
from .models import Post, PostLike, Comments

admin.site.register(Post)
admin.site.register(PostLike)
admin.site.register(Comments)

