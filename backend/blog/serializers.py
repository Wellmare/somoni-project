from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ('author', 'likes', 'comments')

    def create(self, validated_data):
        post = Post()
        post.title = validated_data['title']
        post.content = validated_data['content']
        # post.author = self.context['request'].user
        post.author = validated_data['author']
        try:
            post.image = validated_data['image']
        except KeyError:
            pass
        post.save()
        return post

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.content = validated_data.get("content", instance.content)
        instance.save()
        return instance
