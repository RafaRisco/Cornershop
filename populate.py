import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE','lunch_app.settings')

import django
django.setup()

# from employees.models import User

from django.contrib.auth import get_user_model


from menus.models import (
    Plate,
    Menu,
    EmployeeSelection
)


plate_list = [
    'Pizza',
    'Ajiaco',
    'Gazpacho',
    'Macarrones',
    'Ensalada'
]

employees_list = [
    ['test1@test.com', 'testpassword1', 'testname1'],
    ['test2@test.com', 'testpassword2', 'testname2'],
    ['test3@test.com', 'testpassword3', 'testname3'],
]


def populate():

    for plate in plate_list:
        existing_plate = Plate.objects.filter(name=plate)

        if not existing_plate:
            new_plate = Plate.objects.create(name=plate)

    print('1/3. Plates CREATED. NEXT Users')

    for employee in employees_list:
        existing_user = get_user_model().objects.filter(email=employee[0])

        if not existing_user:
            new_delivery_day = get_user_model().objects.create_user(employee[0], employee[1], employee[2])

    print('2/3. Employees CREATED. NEXT Lunch Manager')

    existing_maneger_user = get_user_model().objects.filter(email='test4@test.com')

    if not existing_maneger_user:
        get_user_model().objects.create_superuser('test4@test.com', 'testpassword3', 'testname3')

    print('2/3. Lunch Manager CREATED. END')


if __name__ == '__main__':
	print("Populating the databases...Please Wait")
	populate()
	print('Populating Complete')
