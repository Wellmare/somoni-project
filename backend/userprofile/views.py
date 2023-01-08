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


class edit_profile(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.none()
    serializer_class = None

    def get_queryset(self):
        return self.request.user

    def get_object(self):
        obj = get_object_or_404(User, id=self.request.user)
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
        if request.user == instance.author or request.user.is_superuser:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'зарегайся сначала, либо ты не автор поста'}, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        instance.delete()
