from django.db import models

# Create your models here.


class Inventory(models.Model):
    productId = models.CharField(max_length=40, unique=True)
    bufferLevel = models.IntegerField(null=True)
    leadTime = models.IntegerField(null=True)
    comment = models.TextField(blank=True)
