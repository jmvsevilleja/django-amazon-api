# Generated by Django 3.0.3 on 2020-02-18 05:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateField(blank=True, null=True, verbose_name='Date/Time')),
                ('settlement_id', models.CharField(max_length=11, null=True)),
                ('type', models.CharField(max_length=100, null=True)),
                ('order_id', models.CharField(max_length=19, null=True)),
                ('sku', models.CharField(max_length=12, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('quantity', models.IntegerField(blank=True, null=True)),
                ('product_sales', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('total', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
            ],
        ),
    ]
