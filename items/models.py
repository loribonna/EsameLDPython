from django.db import models

# Create your models here.
class Item(models.Model):
    item_id=models.UUIDField(),
    item_data=models.CharField(max_length=200),
    def __str__(self):
        return "ItemData: " + self.item_data
    def getId(self):
        return self.item_id.__str__()

class ItemSection(models.Model):
    section_name=models.CharField(max_length=20),
    item=models.ForeignKey(Item, on_delete=models.CASCADE),
    section_data=models.CharField(max_length=200),
    def __str__(self):
        return self.section_name
    def getData(self):
        return self.section_data
    def getParentItem(self):
        return self.item.__str__()
    
