from django.db import models

# Create your models here.


class Transaction(models.Model):

    date_time = models.DateTimeField(blank=True, null=True)
    settlement_id = models.CharField(max_length=11, null=True)
    types = models.CharField(max_length=50, null=True)
    order_id = models.CharField(max_length=19, null=True)
    sku = models.CharField(max_length=12, null=True)
    description = models.TextField(null=True)
    quantity = models.IntegerField(null=True)
    product_sales = models.DecimalField(
        max_digits=10, decimal_places=2, null=True)
    total = models.DecimalField(
        max_digits=10, decimal_places=2, null=True)
