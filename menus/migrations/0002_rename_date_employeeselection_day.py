# Generated by Django 4.0.1 on 2022-01-29 13:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('menus', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employeeselection',
            old_name='date',
            new_name='day',
        ),
    ]
