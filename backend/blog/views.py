from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Post
from .serializers import *


@api_view(['GET', 'POST'])
def customers_list(request):

    if request.method == 'GET':
        query = Post.objects.all()
        ser = CustomerSerializer(query, context={'request': request})
        return Response({'data': ser})

