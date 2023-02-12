import os

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from rest_framework import serializers

from myapi.models import User


class profile_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'bio', 'photo', 'id', 'isEmailConfirmed')
        read_only_fields = ('id', 'isEmailConfirmed',)

    def update(self, instance, validated_data):
        old_email = instance.email
        try:
            instance.bio = validated_data.get("bio", instance.bio)
            if validated_data['photo']:
                instance.photo = validated_data.get("photo", instance.photo)
            instance.email = validated_data.get("email", instance.email)
            instance.save()

            if old_email != instance.email:
                instance.isEmailConfirmed = False
                instance.save()
                subject = f"Email confirm for {instance.username}".format(title="Some website title")
                html_message = render_to_string('email_confirm_password.html',
                                                {'token_username': instance.activate_key_username,
                                                 'token_email': instance.activate_key_email,
                                                 'domain': os.getenv('FRONT_DOMAIN')})
                msg = EmailMultiAlternatives(subject=subject, to=[instance.email])
                msg.attach_alternative(html_message, 'text/html')
                msg.send()
        except KeyError:
            raise serializers.ValidationError(
                {"detail": "some field is missing"})
        return instance
