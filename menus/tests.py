from django.db import IntegrityError
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils.timezone import localtime, now
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

# Create your tests here.
from employees.models import User
from . models import Plate, Menu, EmployeeSelection
from . serializers import PlateSerializer, MenuSerializerCreate, EmployeeSelectionSerializer

CREATE_PLATE_URL = reverse('menus:plate-create')
CREATE_MENU_URL = reverse('menus:today-menu-create')
CREATE_EMPLOYEE_SELECTION_URL = reverse('menus:employee-selection-create')


class PlateTestCase(TestCase):

    def setUp(self):
        self.new_plate = Plate.objects.create(name='Paella')
        self.today = localtime(now()).date()
        self.new_plate_two = Plate.objects.create(name='Ajiaco')

    def test_plate_creation(self):
        '''test plates are created correctly'''
        self.assertEqual(self.new_plate.name, 'Paella')

    def test_menu_creation(self):
        '''test manu are created correctly'''
        today_menu = Menu.objects.create(
          day=self.today
          )
        today_menu.plates.add(self.new_plate, self.new_plate_two)
        self.assertEqual(today_menu.plates.all().count(), 2)
        self.assertEqual(list(today_menu.plates.all()), [self.new_plate, self.new_plate_two])

    def test_employee_selection_creation(self):
        '''test employee_selection area created correctly'''
        employee = get_user_model().objects.create_user(
            'test3@test.com',
            'testpassword',
            'testname',
        )
        today_menu = Menu.objects.create(
          day=self.today
          )
        today_menu.plates.add(self.new_plate, self.new_plate_two)
        employee_selection = EmployeeSelection.objects.create(
            employee=employee,
            menu=today_menu,
            plate=self.new_plate,
            comments='Very spicy please'
        )
        self.assertEqual(employee_selection.plate.name, 'Paella')
        with self.assertRaises(IntegrityError) as context:
            EmployeeSelection.objects.create(
            employee=employee,
            menu=today_menu,
            plate=self.new_plate_two,
            comments='With many popatoes'
        )
        self.assertTrue('UNIQUE constraint failed' in str(context.exception))

class NoStaffCreateTestCase(TestCase):

    def setUp(self):
        self.new_plate = Plate.objects.create(name='Paella')
        self.today = localtime(now()).date()
        self.no_staff_client = APIClient()
        self.no_staff_user = get_user_model().objects.create_user(
            'test@test.com',
            'testpassword',
            'testname'
        )
        self.no_staff_client.force_authenticate(self.no_staff_user)

    def test_create_plate_no_staff(self):
        '''User that it is not staff cannot create a plate'''
        payload = {
            'name': 'Fabada',
        }
        res = self.no_staff_client.post(CREATE_PLATE_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_menu_no_staff(self):
        '''User that it is not staff cannot create a menu'''
        payload = {
            'day': self.today,
            'plates': self.new_plate.id
        }
        res = self.no_staff_client.post(CREATE_MENU_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)


class StaffCreateTestCase(TestCase):

    def setUp(self):
        self.new_plate = Plate.objects.create(name='Paella')
        self.new_plate_two = Plate.objects.create(name='Ajiaco')
        self.today = localtime(now()).date()
        self.staff_client = APIClient()
        self.staff_user = get_user_model().objects.create_superuser(
            'test2@test.com',
            'testpassword',
            'testname'
        )
        self.staff_client.force_authenticate(self.staff_user)


    def test_create_menu_staff(self):
        '''User that is staff can create a menu and one menu per day'''
        payload = {
            'day': self.today,
            'plates': self.new_plate.id
        }
        res = self.staff_client.post(CREATE_MENU_URL, payload)
        menu = Menu.objects.get(day=self.today)
        serializer = MenuSerializerCreate(menu, many=False)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(serializer.data, res.data)
        payload_two = {
            'day': self.today,
            'plates': self.new_plate_two.id
        }
        res = self.staff_client.post(CREATE_MENU_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        
    def test_create_plate_staff(self):
        '''User that is staff can create a plate'''
        payload = {
            'name': 'Fabada',
        }
        res = self.staff_client.post(CREATE_PLATE_URL, payload)

        plate = Plate.objects.get(name__icontains='Fabada')
        serializer = PlateSerializer(plate, many=False)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(serializer.data, res.data)

class EmployeeSelectionCreateTestCase(TestCase):
    def setUp(self):
        self.new_plate = Plate.objects.create(name='Paella')
        self.today = localtime(now()).date()
        self.menu = Menu.objects.create(
            day=self.today
        )
        self.menu.plates.add(self.new_plate)
        self.no_staff_client = APIClient()
        self.no_staff_user = get_user_model().objects.create_user(
            'test5@test.com',
            'testpassword',
            'testname'
        )
        self.no_staff_client.force_authenticate(self.no_staff_user)
        payload = {
            'employee': self.no_staff_user.pk,
            'menu': self.menu.id
        }
        res = self.no_staff_client.post(CREATE_EMPLOYEE_SELECTION_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        employee_selection = EmployeeSelection.objects.get(
            employee__pk=self.no_staff_user.pk,
            menu__id=self.menu.id
        )
        serializer = EmployeeSelectionSerializer(employee_selection, many=False)
        self.assertEqual(serializer.data, res.data)
