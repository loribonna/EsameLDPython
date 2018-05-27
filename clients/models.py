from django.db import models

# Create your models here.
class Client(models.Model):
    client_id=models.UUIDField(),
    client_data=models.CharField(max_length=200),
    def __str__(self):
        return "ClientData: " + self.client_id
    def getId(self):
        return self.client_id.__str__()

class ClientSection(models.Model):
    section_name=models.CharField(max_length=20),
    item=models.ForeignKey(Client, on_delete=models.CASCADE),
    section_data=models.CharField(max_length=200),
    def __str__(self):
        return self.section_name
    def getData(self):
        return self.section_data
    def getParentItem(self):
        return self.item.__str__()
