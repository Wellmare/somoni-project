from django.http import JsonResponse
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import CustomerSerializer
from .models import Post


@api_view(['GET'])
def example_view(request, format=None):
    books = Post.objects.all()
    serializer = CustomerSerializer(books, many=True)
    return Response({'posts': serializer.data}, status=status.HTTP_200_OK)