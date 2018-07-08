from django.db import models
from authentication.models import UserBase

def getFieldIfExists(field):
    return field if field != None else ''

class Client(UserBase):
    class Meta:
        permissions = (('client', 'CLIENT'),)

    def getClientDict(self):
        return {
            'user': getFieldIfExists(self.username),
            'id': self.pk,
            'info': getFieldIfExists(self.info),    
            'reports': getFieldIfExists(self.reportes),
            'black_listed': 1 if self.black_listed else 0,
        }
