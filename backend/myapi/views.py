import os

from django.core.mail import EmailMultiAlternatives
from django.shortcuts import render
from django.template.loader import render_to_string
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.settings import api_settings
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken

from myapi.serializers import MyTokenObtainPairSerializer, RegisterSerializer, ChangePasswordSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from myapi.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import Http404


class logout(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if request.data.get('refresh') != None:
            try:
                token = RefreshToken(request.data.get('refresh'))
                token.blacklist()
            except TokenError:
                return Response("token is invalid", status=status.HTTP_401_UNAUTHORIZED)
            # token = OutstandingToken.objects.all()
            # for list in token:
            #     try:
            #         RefreshToken(list.token).blacklist()
            #     except TokenError:
            #         pass

            return Response("Success")
        else:
            return Response("token is none", status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/token/',
        '/register/',
        '/token/refresh/',
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            if not serializer.data.get("password") == serializer.data.get("password2"):
                return Response({"password": ["password != password2"]}, status=status.HTTP_406_NOT_ACCEPTABLE)
            self.object.set_password(serializer.data.get("password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }
            token = OutstandingToken.objects.filter(user=self.object)
            for list in token:
                try:
                    if list.token != serializer.data.get("refresh"):
                        RefreshToken(list.token).blacklist()
                    else:
                        pass

                except TokenError:
                    pass
            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def activate_email(request):
    try:
        key_email = request.data['key_email']
        key_username = request.data['key_username']
        user = get_object_or_404(User, activate_key_email=key_email, activate_key_username=key_username)
        if user:
            user.isEmailConfimed = True
            user.save()
    except KeyError:
        return Response({'не все поля заполненны'}, status=status.HTTP_400_BAD_REQUEST)
    except Http404:
        return Response({'ключи невалидны'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response({key_email, key_username, user.username}, status=status.HTTP_200_OK)


def send_msg_activate_email(request, user=None):
    if not user:
        user = request.user
    subject = f"Email confirm for {user.username}".format(title="Some website title")
    html_message = render_to_string('email_reset_password.html',
                                    {'token': f'{user.activate_key_username}/{user.activate_key_username}/', 'domain': os.getenv('FRONT_DOMAIN')})
    msg = EmailMultiAlternatives(subject=subject, to=[user.email])
    msg.attach_alternative(html_message, 'text/html')
    msg.send()
