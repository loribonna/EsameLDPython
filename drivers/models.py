from django.db import models
from map.models import PosLatLng
from authentication.models import UserBase
from datetime import datetime

class TimeAvail(models.Model):
    start_time = models.CharField(max_length=5,default=datetime.now())
    duration = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.start_time + ', durata: ' + self.duration.__str__()


class Driver(UserBase):
    driver_rate_per_km = models.PositiveIntegerField(default=0)
    driver_common_start_pos = models.ForeignKey(
        PosLatLng, on_delete=models.CASCADE
    )
    driver_max_distance = models.PositiveIntegerField(default=0)
    driver_time_avail = models.ForeignKey(TimeAvail, on_delete=models.CASCADE, null=True)

    class Meta:
        permissions = (('driver', 'DRIVER'),)
