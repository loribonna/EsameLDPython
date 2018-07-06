from django.db import models
from clients.models import Client
from drivers.models import Driver
from map.models import PosLatLng
import datetime

DATETIME_FORMAT = '%d-%m-%Y %H:%M:%S'


class Travel(models.Model):
    client=models.ForeignKey(Client, on_delete=models.DO_NOTHING)
    driver=models.ForeignKey(Driver, on_delete=models.DO_NOTHING)
    fee=models.FloatField(default=0)
    start_date_time=models.DateTimeField(blank=True)
    end_date_time=models.DateTimeField(blank=True)
    start_pos=models.ForeignKey(PosLatLng, on_delete=models.CASCADE, related_name='startPos')
    end_pos=models.ForeignKey(PosLatLng, on_delete=models.CASCADE, related_name='endPos')
    refound_request=models.BooleanField(default=False)

    def getTravelDict(self):
        if self.driver != None:
            return {
                'fee': self.fee,
                'driver': self.driver.username,
                'start_date_time': self.getStartDate(),
                'end_date_time': self.getEndDate(),
                'start_pos': self.getStartLatLng(),
                'end_pos': self.getEndLatLng(),
                'refound_request': self.getRefReq(),
                'id': self.pk
            }
        return {}

    def getStartLatLng(self):
        if self.start_pos and self.start_pos.lat and self.start_pos.lng:
            return [self.start_pos.lat, self.start_pos.lng]
        return []

    def getEndLatLng(self):
        if self.end_pos and self.end_pos.lat and self.end_pos.lng:
            return [self.end_pos.lat, self.end_pos.lng]
        return []

    def getRefReq(self):
        if self.refound_request==True:
            return 1
        return 0

    def getStartDate(self):
        if self.start_date_time != None:
            return self.start_date_time.isoformat()
        return ""

    def getEndDate(self):
        if self.end_date_time != None:
            return self.end_date_time.isoformat()
        return ""
