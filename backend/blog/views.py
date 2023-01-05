from django.contrib.auth.models import User
from django.http import Http404
from rest_framework import status, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets
from rest_framework.views import APIView

from .serializers import PostSerializer, CreatePostSerializer
from .models import Post, PostLike
from django.db.models import Prefetch, Exists, OuterRef


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10


class get_create_post(generics.ListCreateAPIView):
    pagination_class = StandardResultsSetPagination
    permission_classes = (AllowAny,)
    serializer_class = CreatePostSerializer
    queryset = Post.objects.none()

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Post.objects \
                .annotate(isLked=Exists(PostLike.objects.filter(
                user=self.request.user, post_id=OuterRef('pk')))) \
                .order_by('title')
        return Post.objects.all()


class post_detail_view(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.none()
    serializer_class = CreatePostSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Post.objects \
                .annotate(isLked=Exists(PostLike.objects.filter(
                user=self.request.user, post_id=OuterRef('pk')))) \
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
        return Response({'зарегайся сначала, либо ты не автор поста'}, status=status.HTTP_200_OK)

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
