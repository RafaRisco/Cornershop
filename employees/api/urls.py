from django.urls import path

from .views import UserListView, MyTokenObtainPairView

urlpatterns = [
     path('login/', MyTokenObtainPairView.as_view(), name='api_login'),
     path('', UserListView.as_view(), name='employees-list'),
]
