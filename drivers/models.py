from django.db import models

# Create your models here.
class Driver(models.Model):
    driver_id=models.UUIDField(),
    def __str__(self):
        return "DriverData: " + self.driver_id
    def getId(self):
        return self.driver_id.__str__()