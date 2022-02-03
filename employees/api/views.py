from django.utils.timezone import now, localtime
from rest_framework import generics

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import User
from ..serializers import UserSerializer, UserSerializerWithToken

class UserListView(generics.ListAPIView):
    model = User
    serializer_class = UserSerializer
    queryset = User.objects.all()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for key, val in serializer.items():
            data[key] = val
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer