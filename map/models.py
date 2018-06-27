from django.db import models

# Create your models here.
class PosLatLng(models.Model):
    lat=models.PositiveSmallIntegerField()
    lng=models.PositiveSmallIntegerField()

    def __str__(self):
        return self.lat.__str__() + ", " + self.lng.__str__()