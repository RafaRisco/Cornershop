from django.utils.timezone import now, localtime
from rest_framework import serializers

from . models import Plate, Menu, EmployeeSelection
from employees.serializers import UserSerializer

class PlateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Plate
        fields = ['pk', 'name']

class MenuSerializerList(serializers.ModelSerializer):
    plates = serializers.SerializerMethodField(read_only=True)
    employees_selection = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Menu
        fields = ['id', 'day', 'plates', 'employees_selection']

    def get_plates(self, obj):
        menu_plates = obj.plates.all()
        serializer = PlateSerializer(menu_plates, many=True)
        return serializer.data

    def get_employees_selection(self, obj):
        menu_employees_selection = obj.employeeselection_set.all()
        serializer = EmployeeSelectionDetailSerializer(menu_employees_selection, many=True)
        return serializer.data

class MenuSerializerCreate(serializers.ModelSerializer):

    class Meta:
        model = Menu
        fields = ['day', 'plates']

class MenuForeignKey(serializers.PrimaryKeyRelatedField):

    def get_queryset(self):
        today = localtime(now()).date()
        return Menu.objects.filter(day=today)

class PlateForeignKey(serializers.PrimaryKeyRelatedField):
    
    def get_queryset(self):
        today = localtime(now()).date()
        today_menu_plates = Menu.objects.filter(day=today).first()
        return today_menu_plates.plates.all()

class EmployeeSelectionSerializer(serializers.ModelSerializer):
    menu = MenuForeignKey()
    plate = PlateForeignKey()

    class Meta:
        model = EmployeeSelection
        fields = ['employee', 'menu', 'plate', 'comments']

class EmployeeSelectionDetailSerializer(serializers.ModelSerializer):
    plate = serializers.SerializerMethodField(read_only=True)
    employee = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = EmployeeSelection
        fields = ['employee', 'plate', 'comments']

    def get_plate(self, obj):
        employee_selection_plate = obj.plate
        serializer = PlateSerializer(employee_selection_plate, many=False)
        return serializer.data

    def get_employee(self, obj):
        employee = obj.employee
        serializer = UserSerializer(employee, many=False)
        return serializer.data
