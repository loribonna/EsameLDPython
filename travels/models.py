from django.db import models
from clients.models import Client
from drivers.models import Driver
from map.models import PosLatLng
import datetime

DATETIME_FORMAT = '%d-%m-%Y %H:%M:%S'


class Travel(models.Model):
    client=models.ForeignKey(Client, on_delete=models.CASCADE)
    driver=models.ForeignKey(Driver, on_delete=models.CASCADE)
    fee=models.PositiveIntegerField(default=0)
    startDateTime=models.DateTimeField(auto_now_add=True, blank=True)
    endDateTime=models.DateTimeField(auto_now_add=True, blank=True)
    startPos=models.ForeignKey(PosLatLng, on_delete=models.CASCADE, related_name='startPos')
    endPos=models.ForeignKey(PosLatLng, on_delete=models.CASCADE, related_name='endPos')
    refound_request=models.BooleanField(default=False)

    def travelData(self):
        return 'Cost: '+self.fee.__str__()+', Date: '+self.getDateTime()

    def getDateTime(self):
        return datetime.datetime.strptime(self.startDateTime).strftime(DATETIME_FORMAT)
