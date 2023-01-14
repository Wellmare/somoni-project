from myapi.models import User
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets
from rest_framework.settings import api_settings
from rest_framework.views import APIView
from taggit.models import Tag
from .serializers import PostSerializer, CreatePostSerializer, CommentSerializer
from .models import Post, PostLike, Comments
from django.db.models import Prefetch, Exists, OuterRef
from collections import OrderedDict


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10


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


class get_create_post(generics.ListCreateAPIView):
    pagination_class = StandardResultsSetPagination
    permission_classes = (AllowAny,)
    serializer_class = CreatePostSerializer
    queryset = Post.objects.none()

    def get_queryset(self):
        try:
            tag = get_object_or_404(Tag, slug=self.kwargs['tag_slug'])
            object_list = Post.objects.filter(tags__in=[tag])
            if self.request.user.is_authenticated:
                return object_list.annotate(
                    isLiked=Exists(PostLike.objects.filter(user=self.request.user, post_id=OuterRef('pk')))).order_by(
                    '-date')
            else:
                return object_list.order_by('-date')

        except KeyError:
            if self.request.user.is_authenticated:
                return Post.objects.annotate(
                    isLiked=Exists(PostLike.objects.filter(user=self.request.user, post_id=OuterRef('pk')))).order_by(
                    '-date')
        return Post.objects.all().order_by('-date')

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response({'зарегистрируйся'}, status=status.HTTP_401_UNAUTHORIZED)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}


class post_detail_view(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.none()
    serializer_class = CreatePostSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Post.objects \
                .annotate(isLiked=Exists(PostLike.objects.filter(
                user=self.request.user, post_id=OuterRef('pk'))),
                isMyPost=Exists(Post.objects.filter(
                    author=self.request.user, id=OuterRef('pk')))) \
                .order_by('title')
        return Post.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        if request.user == instance.author or request.user.is_superuser:

            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return Response(serializer.data)
        return Response({'зарегайся сначала, либо ты не автор поста'}, status=status.HTTP_401_UNAUTHORIZED)

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


@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def like_post(request, pk):
    if request.method == 'POST':
        try:
            post = get_object_or_404(Post, id=pk)
            try:
                get_object_or_404(PostLike, post=post, user=request.user)
                return Response({'detail': 'the like is already worth it'},
                                status=status.HTTP_400_BAD_REQUEST)
            except Http404:
                like = PostLike()
                like.user = request.user
                like.post = post
                like.save()
                post.likes += 1
                post.save()
                return Response({'лайк поставили'}, status=status.HTTP_200_OK)
        except Http404:
            return Response({'detail': 'post not found'},
                            status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        try:
            post = get_object_or_404(Post, id=pk)
            try:
                like = get_object_or_404(PostLike, post=post, user=request.user)
                like.delete()
                post.likes -= 1
                post.save()
                return Response({'лайк убрали'}, status=status.HTTP_200_OK)

            except Http404:
                return Response({'detail': 'лайка и не было'},
                                status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response({'detail': 'post not found'},
                            status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'detail': 'Method ' + request.method + ' not allowed.'},
                        status=status.HTTP_405_METHOD_NOT_ALLOWED)


class get_create_comments(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = CommentSerializer
    queryset = Comments.objects.none()

    def get_queryset(self):
        post = get_object_or_404(Post, id=self.kwargs['pk'])
        comments = Comments.objects.filter(post=post).order_by('-date')
        if self.request.user.is_authenticated:
            return comments \
                .annotate(isMyComment=Exists(Post.objects.filter(
                    author=self.request.user, id=OuterRef('pk')))) \
                .order_by('-date')
        return comments

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response({'зарегистрируйся'}, status=status.HTTP_401_UNAUTHORIZED)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}


class comment_detail_view(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comments.objects.all().order_by('-date')
    serializer_class = CommentSerializer

    # def get_queryset(self):
    #     post = get_object_or_404(Post, id=self.kwargs['pk'])
    #     return Comments.objects.filter(post=post).order_by('-date')

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        if request.user == instance.author or request.user.is_superuser:

            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return Response(serializer.data)
        return Response({'зарегайся сначала, либо ты не автор поста'}, status=status.HTTP_401_UNAUTHORIZED)

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


class get_post_for_user(generics.ListCreateAPIView):
    pagination_class = userResultsSetPagination
    permission_classes = (AllowAny,)
    serializer_class = CreatePostSerializer
    queryset = Post.objects.none()

    def get_queryset(self):
        user = get_object_or_404(User, id=self.kwargs['pk'])
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


def post_list(request, tag_slug=None):
    object_list = Post.published.all()
    tag = None

    if tag_slug:
        tag = get_object_or_404(Tag, slug=tag_slug)
        object_list = object_list.filter(tags__in=[tag])
