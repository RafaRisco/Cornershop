from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.db import models

# Create your models here.
class UserManager(BaseUserManager):

    def _create_user(self, email, password, name, is_staff, is_superuser, **kwargs):
        if not email:
            raise ValueError('You have to provide an email')
        now = timezone.now()
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            name=name,
            is_active=True,
            is_staff=is_staff,
            is_superuser=is_superuser,
            last_login=now,
            date_joined=now
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, name, **kwargs):
        return self._create_user(email, name, password, False, False)

    def create_superuser(self, email, password, name, **kwargs):
        user = self._create_user(email, password, name, is_staff=True, is_superuser=True)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    '''Custom User Model'''
    email = models.EmailField(max_length=254, unique=True)
    name = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)
    is_staff= models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = UserManager()

    def __str__(self):
        return self.name
