from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    isLked = serializers.BooleanField(read_only=True, default=False)

    class Meta:
        model = Post
        fields = '__all__'


class CreatePostSerializer(serializers.ModelSerializer):
    isLked = serializers.BooleanField(read_only=True, default=False)

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ('author', 'likes', 'comments', 'date')

    def create(self, validated_data):
        post = Post()
        post.title = validated_data['title']
        post.content = validated_data['content']

        #post.author = validated_data['author']
        try:
            post.image = validated_data['image']
        except KeyError:
            pass
        post.author = self.context['request'].user
        post.save()
        return post

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.content = validated_data.get("content", instance.content)
        instance.save()
        return instance
