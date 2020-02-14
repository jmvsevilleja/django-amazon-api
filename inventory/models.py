from django.db import models

# Create your models here.


class Inventory(models.Model):
    productId = models.CharField(max_length=40, unique=True)
    bufferLevel = models.IntegerField()
    leadTime = models.IntegerField()
    comment = models.TextField(blank=True)
