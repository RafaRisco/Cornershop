# Generated by Django 4.0.1 on 2022-01-31 23:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menus', '0005_remove_employeeselection_day_employeeselection_menu'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plate',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
