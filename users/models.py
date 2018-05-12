from django.db import models
from enum import Enum

# User_Type = Enum('PUBLIC', 'NORMAL', 'ADMIN')


# Create your models here.
class User(models.Model):
    user_id=models.UUIDField(),
    user_type=models.CharField(max_length=10),
    user_name=models.CharField(max_length=50),
    def __str__(self):
        return "Name: " + self.user_name + ", Type: " + self.user_type.__str__()
    def getId(self):
        return self.user_id.__str__()
    def getType(self):
        return self.user_type.__str__()