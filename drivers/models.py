from django.db import models
from map.models import PosLatLng
from authentication.models import UserBase
from datetime import datetime

def getFieldIfExists(field):
    return field if field != None else ''

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
    reports = models.PositiveIntegerField(default=0)
    class Meta:
        permissions = (('driver', 'DRIVER'),)

    def idValid(self):
        return not self.black_listed

    def isDBConsistent(self):
        return (self.max_distance != None 
            and self.rate_per_km != None 
            and self.common_start_pos_lat != None 
            and self.common_start_pos_lng != None 
            and self.time_avail.start_time != None 
            and self.time_avail.duration != None)

    def getDriverDict(self):
        ret = {
            'user': getFieldIfExists(self.username),
            'id': self.pk,
            'info': getFieldIfExists(self.info),
            'rate_per_km': getFieldIfExists(self.rate_per_km),
            'common_start_pos': {
                'lat': getFieldIfExists(self.common_start_pos_lat),
                'lng': getFieldIfExists(self.common_start_pos_lng)
            },
            'max_distance': getFieldIfExists(self.max_distance),
            'start_time': '',
            'reports': getFieldIfExists(self.reportes),
            'black_listed': 1 if self.black_listed else 0,
            'duration': '',
            'db_consistent': 1 if self.isDBConsistent() else 0
        }
        if self.time_avail != None:
            ret['start_time'] = getFieldIfExists(self.time_avail.start_time)
            ret['duration']= getFieldIfExists(self.time_avail.duration)
        return ret