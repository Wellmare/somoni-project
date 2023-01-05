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
from .models import Post
from django.shortcuts import get_object_or_404


# views.py
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10


class PostViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    queryset = Post.objects.all().order_by('title')
    serializer_class = PostSerializer


class CreatePostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CreatePostSerializer


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def delete_post(request, pk):
    if request.method == 'POST':
        try:
            post = get_object_or_404(Post, id=pk)
            if request.user == post.author or request.user.is_superuser:
                print(post)
                post.delete()
                data = 'удалено'
                return Response({'response': data}, status=status.HTTP_200_OK)
            data = 'пользователь не является автором поста'
            return Response({'response': data}, status=status.HTTP_200_OK)
        except Http404:
            data = 'нет объекта'
            return Response({'response': data}, status=status.HTTP_200_OK)
    else:
        data = 'не подходит метод запроса'
        return Response({'response': data}, status=status.HTTP_200_OK)


class get_create_post(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    pagination_class = StandardResultsSetPagination
    permission_classes = (AllowAny,)
    serializer_class = CreatePostSerializer


class post_detail_view(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = CreatePostSerializer

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