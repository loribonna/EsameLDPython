from django.db import models

# Create your models here.
class UserBase(models.Model):
    name=models.CharField(max_length=50)
    info=models.CharField(max_length=200)
    reportes=models.PositiveSmallIntegerField()
    black_listed=models.BooleanField()
    def __str__(self):
        return self.name.__str__()