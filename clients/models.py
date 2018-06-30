from django.db import models
from authentication.models import UserBase


class Client(UserBase):
    class Meta:
        permissions = (('client', 'CLIENT'),)

