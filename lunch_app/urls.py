"""lunch_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from django.views.generic import TemplateView

import debug_toolbar

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/menu/', include(('menus.api.urls', 'menus'), namespace='menus')),
    path('api/employees/', include('employees.api.urls')),
    path('docs/', include_docs_urls(title='Cornershop Meals')),
    path('schema/', get_schema_view(
        title='Cornershop Meals',
        description='API to order meals for the CornerShop Team',
        version='1.0.0'
    ), name='openapi-schema'),
    path('__debug__/', include('debug_toolbar.urls')),
]

