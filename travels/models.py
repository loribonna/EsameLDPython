from django.db import models
from clients.models import Client
from drivers.models import Driver
import datetime

DATETIME_FORMAT = '%d-%m-%Y %H:%M:%S'

class Travel(models.Model):
    travel_id=models.UUIDField(),
    client=models.ForeignKey(Client, on_delete=models.CASCADE)
    driver=models.ForeignKey(Driver, on_delete=models.CASCADE)
    fee=models.PositiveIntegerField()
    datetime=models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return 'Client: '+self.client.__str__()+', Driver: '+self.driver.__str__()

    def travelData(self):
        return 'Cost: '+self.fee.__str__()+', Date: '+self.getDateTime()

    def getDateTime(self):
        return datetime.datetime.strptime(self.datetime).strftime(DATETIME_FORMAT)

    def getId(self):
        return self.travel_id.__str__()