from django.db import models
from django.contrib.auth.models import User

class UserBase(User):
    info = models.CharField(max_length=200, null=True)
    reportes = models.PositiveSmallIntegerField(default=0)
    black_listed = models.BooleanField(default=False)

    def __str__(self):
        return self.username.__str__()
