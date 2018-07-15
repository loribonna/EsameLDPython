from django.db import models
from map.models import PosLatLng
from authentication.models import UserBase
from datetime import datetime

def getFieldIfExists(field, subfield = None):
    if field != None:
        if subfield != None:
            return getattr(field, subfield, '')
        return field
    return ''
    
class TimeAvail(models.Model):
    start_time = models.CharField(max_length=5,default=datetime.now())
    duration = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.start_time + ', durata: ' + self.duration.__str__()


class Driver(UserBase):
    rate_per_km = models.FloatField()
    common_start_pos = models.ForeignKey(PosLatLng, on_delete=models.CASCADE, null=True)
    max_distance = models.PositiveIntegerField()
    time_avail = models.ForeignKey(TimeAvail, on_delete=models.CASCADE, null=True)
    class Meta:
        permissions = (('driver', 'DRIVER'),)

    def isValid(self):
        return not self.black_listed

    def isDBConsistent(self):
        return (self.max_distance != None 
            and self.rate_per_km != None 
            and self.common_start_pos != None
            and self.common_start_pos.lat != None 
            and self.common_start_pos.lng != None 
            and self.time_avail.start_time != None 
            and self.time_avail.duration != None)

    def getDriverDict(self):
        ret = {
            'user': getFieldIfExists(self.username),
            'id': self.pk,
            'info': getFieldIfExists(self.info),
            'rate_per_km': getFieldIfExists(self.rate_per_km),
            'common_start_pos': {
                'lat': getFieldIfExists(self.common_start_pos,subfield='lat'),
                'lng': getFieldIfExists(self.common_start_pos,subfield='lng')
            },
            'max_distance': getFieldIfExists(self.max_distance),
            'start_time': '',
            'reports': getFieldIfExists(self.reports),
            'black_listed': 1 if self.black_listed else 0,
            'duration': '',
            'db_consistent': 1 if self.isDBConsistent() else 0
        }
        if self.time_avail != None:
            ret['start_time'] = getFieldIfExists(self.time_avail.start_time)
            ret['duration']= getFieldIfExists(self.time_avail.duration)
        return ret