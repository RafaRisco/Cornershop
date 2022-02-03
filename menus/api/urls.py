from django.urls import path
from . views import (
    PlatesListView,
    PlateCreateView,
    TodayMenuView,
    CreateTodayMenuView,
    CreateEmployeeSelectionView,
)

urlpatterns = [
     path('plates/', PlatesListView.as_view(), name='plates-list'),
     path('plates/create/', PlateCreateView.as_view(), name='plate-create'),
     path('today_menu/', TodayMenuView.as_view(), name='today-menu'),
     path('today_menu/create/', CreateTodayMenuView.as_view(), name='today-menu-create'),
     path('employee_selection/create/', CreateEmployeeSelectionView.as_view(), name='employee-selection-create')
]
