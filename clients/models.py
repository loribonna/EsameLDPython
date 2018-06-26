from django.db import models

# Create your models here.
class Client(models.Model):
    client_id=models.UUIDField(),
    client_name=models.CharField(max_length=50),
    client_info=models.CharField(max_length=200),
    def __str__(self):
        return self.client_name.__str__()
    def getId(self):
        return self.client_id.__str__()

