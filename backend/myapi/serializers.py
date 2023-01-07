from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from userprofile.models import Profile


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    photo = serializers.ImageField(write_only=True, default='default.png')

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', 'photo')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        try:
            if validated_data['email'] == '':
                raise serializers.ValidationError(
                    {"email": "this field is required"})
            else:
                user = User.objects.create(
                    username=validated_data['username'],
                    email=validated_data['email']
                )

                user.set_password(validated_data['password'])
                user.save()

                profile = Profile()
                profile.user = user
                profile.image = validated_data['photo']
                profile.save()
        except KeyError:
            raise serializers.ValidationError(
                    {"detail": "some field is missing"})

        return user


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    password2 = serializers.CharField(required=True)
    refresh = serializers.CharField(required=True)