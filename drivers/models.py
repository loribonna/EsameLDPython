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
    rate_per_km = models.PositiveIntegerField()
    common_start_pos_lat = models.FloatField(default=41.98)
    common_start_pos_lng = models.FloatField(default=12.5)
    max_distance = models.PositiveIntegerField()
    time_avail = models.ForeignKey(TimeAvail, on_delete=models.CASCADE, null=True)

    class Meta:
        permissions = (('driver', 'DRIVER'),)
