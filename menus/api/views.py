from django.db.models import Prefetch
from django.conf import settings
from django.utils.timezone import now, localtime
from rest_framework import generics
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Plate, Menu, EmployeeSelection
from ..serializers import (
    PlateSerializer, 
    MenuSerializerList, 
    MenuSerializerCreate,
    EmployeeSelectionSerializer
)

from ..utils import send_slack_message

MAX_HOUR_TO_ORDER_LAUNCH = settings.MAX_HOUR_TO_ORDER_LAUNCH

class PlatesListView(generics.ListAPIView):
    '''Return all the potential plates for the menus'''
    model = Plate
    serializer_class = PlateSerializer
    queryset = Plate.objects.all()
    permission_classes = [IsAdminUser]

class PlateCreateView(generics.CreateAPIView):
    '''Create a new plate, that later can be included in the menu for a particular day'''
    model = Plate
    serializer_class = PlateSerializer
    permission_classes = [IsAdminUser]

class TodayMenuView(generics.ListAPIView):
    '''Return the menu for a particular day'''
    model = Menu
    serializer_class = MenuSerializerList

    def get_queryset(self):
        '''Filter the meny according to the day'''
        today = localtime(now()).date()
        todays_menu = Menu.objects.prefetch_related(
            Prefetch(
                'employeeselection_set',
                queryset = EmployeeSelection.objects.select_related(
                    'employee',
                    'menu',
                    'plate'
                )
            ),
            'plates'
            ).filter(day=today)
        return todays_menu

class CreateTodayMenuView(generics.CreateAPIView):
    '''Create Menu for a particular day'''
    serializer_class = MenuSerializerCreate
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        '''Prevent to create two menus for the same day'''
        today = localtime(now()).date()
        todays_menu_qs = Menu.objects.filter(day=today)
        if todays_menu_qs.exists():
            return Response({'detail': 'Ya hay menú para hoy'}, status=status.HTTP_400_BAD_REQUEST)
        return self.create(request, *args, **kwargs)

    def get_queryset(self):
        '''Filter today menu'''
        today = localtime(now()).date()
        todays_menu_qs = Menu.objects.prefetch_related(
            'plates'
        ).filter(day=today)
        return todays_menu_qs

    def perform_create(self, serializer):
        '''
        Check there is one menu per day, and that a the menu it is 
        created for today or one day in the future
        '''
        todays_menu_qs = self.get_queryset()
        today = localtime(now()).date()
        if serializer.validated_data['day'] < today:            
            raise ValidationError("No se pueden crear menús para días pasados")
        if todays_menu_qs.exists():
            raise ValidationError("Ya hay un menú para hoy")
        return super().perform_create(serializer)

class CreateEmployeeSelectionView(generics.CreateAPIView):
    '''Create an employee selection for a dish for a particular day'''
    model = EmployeeSelection
    serializer_class = EmployeeSelectionSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        '''
        Include employee on Employee selection and 
        Prevent to create more than one employee dish selection for the same day
        '''
        request.data['employee'] = request.user.pk
        employee_selection_today_menu = EmployeeSelection.objects.select_related('employee', 'menu', 'plate').filter(
            employee=request.user,
            menu__id=request.data['menu']
        )
        if employee_selection_today_menu.exists():
            return Response({'detail': f'{employee_selection_today_menu.first().employee.name} ({employee_selection_today_menu.first().employee.email}) eligió {employee_selection_today_menu.first().plate.name} para hoy'}, status=status.HTTP_400_BAD_REQUEST)
        request_time = localtime(now())
        request_hour = request_time.time()
        hour = request_hour.hour
        if hour > MAX_HOUR_TO_ORDER_LAUNCH:
            return Response({'detail': f'Ya no podemos ayudarte con tu almuerzo. La hora límite para pedir tu almuerzo son las {MAX_HOUR_TO_ORDER_LAUNCH}'}, status=status.HTTP_400_BAD_REQUEST)
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        ''' Include user, using the provided token'''
        print(serializer.validated_data, 'serializer.validated_data')
        return super().perform_create(serializer)
