from django.shortcuts import get_object_or_404
from rest_framework import serializers
from .models import Post, Comments
from taggit.serializers import (TagListSerializerField,
                                TaggitSerializer)


class PostSerializer(serializers.ModelSerializer):
    isLiked = serializers.BooleanField(read_only=True, default=False)
    username = serializers.CharField(source='author.username', read_only=True)
    photo = serializers.ImageField(source='author.photo', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'


class CreatePostSerializer(serializers.ModelSerializer):
    isLiked = serializers.BooleanField(read_only=True, default=False)
    username = serializers.CharField(source='author.username', read_only=True)
    photo = serializers.ImageField(source='author.photo', read_only=True)
    tags = TagListSerializerField(required=False)
    isMyPost = serializers.BooleanField(read_only=True, default=False)

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ('author', 'likes', 'comments', 'date')

    def create(self, validated_data):
        try:
            tags = validated_data['tags'][0]
            tags = tags.split()
            for tag in tags:
                if ('#' in tag):
                    raise serializers.ValidationError(
                        {"tag": "invalid character = '#'"})
                else:
                    pass
        except KeyError:
            pass
        try:
            post = Post()
            post.title = validated_data['title']
            post.content = validated_data['content']

            # post.author = validated_data['author']
            try:
                post.image = validated_data['image']
            except KeyError:
                pass
            post.author = self.context['request'].user

            post.save()
            try:
                tags = validated_data['tags'][0]
                tags = tags.split()
                for tag in tags:
                    if not ('#' in tag):
                        post.tags.add(tag)
                    else:
                        pass
            except KeyError:
                pass

        except KeyError:
            raise serializers.ValidationError(
                {"detail": "some field is missing"})
        return post

    def update(self, instance, validated_data):
        try:
            tags = validated_data['tags'][0]
            tags = tags.split()
            for tag in tags:
                if ('#' in tag):
                    raise serializers.ValidationError(
                        {"tag": "invalid character = '#'"})
                else:
                    pass
        except KeyError:
            pass
        try:
            instance.title = validated_data.get("title", instance.title)
            instance.content = validated_data.get("content", instance.content)
            if validated_data['image']:
                instance.image = validated_data.get("image", instance.image)
            instance.save()
            try:
                tags = validated_data['tags'][0]
                instance.tags.clear()
                tags = tags.split()
                for tag in tags:
                    if not ('#' in tag):
                        instance.tags.add(tag)
                    else:
                        pass
            except KeyError:
                pass




        except KeyError:
            raise serializers.ValidationError(
                {"detail": "some field is missing"})
        return instance


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='author.username', read_only=True)
    photo = serializers.ImageField(source='author.photo', read_only=True)
    isMyComment = serializers.BooleanField(read_only=True, default=False)

    class Meta:
        model = Comments
        fields = '__all__'
        read_only_fields = ('author', 'post', 'date')

    def create(self, validated_data):
        try:
            comment = Comments()
            comment.content = validated_data['content']
            # comment.author = get_object_or_404(User, id=1)
            comment.author = self.context['request'].user
            comment.post = get_object_or_404(Post, id=self.context['view'].kwargs['pk'])
            comment.save()
            post = get_object_or_404(Post, id=self.context['view'].kwargs['pk'])

            post.comments += 1
            post.save()
        except KeyError:
            raise serializers.ValidationError(
                {"detail": "some field is missing"})
        return comment

    def update(self, instance, validated_data):
        try:
            instance.content = validated_data.get("content", instance.content)
            instance.save()
        except KeyError:
            raise serializers.ValidationError(
                {"detail": "some field is missing"})
        return instance
