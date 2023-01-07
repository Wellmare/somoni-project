from django.contrib.auth.models import User
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


class userResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10

    def get_paginated_response(self, data):
        user = self.request.user
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('username', user.username),
            ('photo', self.request.build_absolute_uri(user.profile.image.url)),
            ('bio', user.profile.bio),
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
