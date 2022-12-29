from rest_framework import serializers
from .models import Post

class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'pub_date', 'author', 'ratings', 'comments')