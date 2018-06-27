from django.db import models
from administrator.models import UserBase
# Create your models here.
class Client(UserBase):
    def __str__(self):
        return self.__str__()
