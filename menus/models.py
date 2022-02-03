from django.db import models
import uuid

from employees.models import User

# Create your models here.
class Plate(models.Model):
    '''All the potential plates'''
    name = models.CharField(max_length=100, unique=True)

    def __srt__(self):
        return self.name

class Menu(models.Model):
    '''All the potential plates available for a particular day'''
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    plates = models.ManyToManyField(Plate)
    day = models.DateField(unique=True)

    def __str__(self):
        return str(self.day)

    # def get_absolute_url(self):
    #     return reverse("model_detail", kwargs={"id": self.id})
    

class EmployeeSelection(models.Model):
    '''An plate employeefor a particular day, whith the employee particular requests'''
    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    plate = models.ForeignKey(Plate, on_delete=models.CASCADE)
    comments = models.TextField()

    def __str__(self):
        return str(self.employee.name)

    class Meta:
        unique_together = ['employee', 'menu']
        