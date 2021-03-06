from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

from . models import User

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['pk', 'name', 'email']

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ['pk', 'name', 'email', 'token', 'is_staff' ]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)