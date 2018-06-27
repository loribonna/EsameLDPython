from django.db import models
from map.models import PosLatLng

class TimeAvail(models.Model):
    start_time=models.CharField(max_length=5)
    duration=models.PositiveIntegerField()
    def __str__(self):
        return self.start_time + ', durata: ' + self.duration.__str__()

# Create your models here.
class Driver(models.Model):
    driver_id=models.UUIDField(),
    driver_name=models.CharField(max_length=50)
    driver_info=models.CharField(max_length=200)
    driver_rate_per_km=models.PositiveIntegerField()
    driver_common_start_pos=models.ForeignKey(PosLatLng, on_delete=models.CASCADE)
    driver_max_distance=models.PositiveIntegerField()
    driver_time_avail=models.ForeignKey(TimeAvail, on_delete=models.CASCADE)

    def __str__(self):
        return "DriverID: " + self.getId()
    def getId(self):
        return self.driver_id.__str__()