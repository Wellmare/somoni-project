from rest_framework import serializers

from myapi.models import User


class profile_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'bio', 'photo', )

    def update(self, instance, validated_data):
        try:
            instance.username = validated_data.get("username", instance.username)
            instance.bio = validated_data.get("bio", instance.bio)
            if validated_data['photo']:
                instance.photo = validated_data.get("photo", instance.photo)
            instance.email = validated_data.get("email", instance.email)
            instance.save()
        except KeyError:
            raise serializers.ValidationError(
                {"detail": "some field is missing"})
        return instance
