from rest_framework.decorators import api_view

from myapi.models import User
from django.shortcuts import get_object_or_404

# Create your views here.
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from blog.models import Post, PostLike
from blog.serializers import CreatePostSerializer
from django.db.models import Exists, OuterRef
from rest_framework.pagination import PageNumberPagination
from collections import OrderedDict

from userprofile.serializer import profile_serializer

from django.core.mail import EmailMessage

import os
import time
import hashlib


def _createHash():
    """This function generate 10 character long hash"""
    hash = hashlib.sha1()
    hash.update(str(get_object_or_404(User, username='admin').email).encode())
    return hash.hexdigest()


@api_view(['POST'])
def send_email(request):
    a = _createHash()
    msg = EmailMessage('Request Callback',
                       f'Here is the message.{a}', to=['morozovd0605@gmail.com'])
    msg.send()
    return Response(f'{a}')


class userResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10

    def get_paginated_response(self, data):
        pk = self.request.parser_context['kwargs']['pk']
        user = get_object_or_404(User, id=pk)
        isMyProfile = self.request.user.id == pk
        try:
            if isMyProfile:
                return Response(OrderedDict([
                    ('count', self.page.paginator.count),
                    ('next', self.get_next_link()),
                    ('previous', self.get_previous_link()),
                    ('username', user.username),
                    ('photo', self.request.build_absolute_uri(user.photo.url)),
                    ('bio', user.bio),
                    ('email', user.email),
                    ('isMyProfile', isMyProfile),
                    ('results', data)
                ]))
            else:
                return Response(OrderedDict([
                    ('count', self.page.paginator.count),
                    ('next', self.get_next_link()),
                    ('previous', self.get_previous_link()),
                    ('username', user.username),
                    ('photo', self.request.build_absolute_uri(user.photo.url)),
                    ('bio', user.bio),
                    ('isMyProfile', isMyProfile),
                    ('results', data)
                ]))
        except ValueError:
            if isMyProfile:
                return Response(OrderedDict([
                    ('count', self.page.paginator.count),
                    ('next', self.get_next_link()),
                    ('previous', self.get_previous_link()),
                    ('username', user.username),
                    ('photo', self.request.build_absolute_uri('/media/default.png')),
                    ('bio', user.bio),
                    ('email', user.email),
                    ('id', user.id),
                    ('isMyProfile', isMyProfile),
                    ('results', data)
                ]))
            else:
                return Response(OrderedDict([
                    ('count', self.page.paginator.count),
                    ('next', self.get_next_link()),
                    ('previous', self.get_previous_link()),
                    ('username', user.username),
                    ('photo', self.request.build_absolute_uri('/media/default.png')),
                    ('bio', user.bio),
                    ('id', user.id),
                    ('isMyProfile', isMyProfile),
                    ('results', data)
                ]))


class profile(generics.ListCreateAPIView):
    pagination_class = userResultsSetPagination
    permission_classes = (IsAuthenticated,)
    serializer_class = CreatePostSerializer
    queryset = Post.objects.none()

    def get_queryset(self):
        user = self.request.user
        if self.request.user.is_authenticated:
            return Post.objects.filter(author=user).annotate(
                isLiked=Exists(PostLike.objects.filter(user=self.request.user, post_id=OuterRef('pk')))).order_by(
                '-date')
        return Post.objects.filter(author=user).order_by('-date')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        return Response({'detail': 'method POST not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class edit_profile(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.none()
    serializer_class = profile_serializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.request.user

    def get_object(self):
        obj = get_object_or_404(User, id=self.request.user.id)
        return obj

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


@api_view(['GET'])
def getprofile(request, pk):
    if request.user.id == pk:

        user = get_object_or_404(User, id=pk)

        return Response({
            "username": user.username,
            "photo": request.build_absolute_uri(user.photo.url),
            "bio": user.bio,
            "id": user.id,
            "email": user.email,
            "isMyProfile": True
        })
    else:
        user = get_object_or_404(User, id=pk)
        return Response({
            "username": user.username,
            "photo": request.build_absolute_uri(user.photo.url),
            "bio": user.bio,
            "id": user.id,
            "isMyProfile": False
        })
