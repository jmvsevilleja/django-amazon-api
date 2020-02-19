from django.contrib import admin
from .models import Transaction
from decimal import *
from dateutil import tz
from dateutil.parser import parse
from datetime import date, datetime
from django.conf import settings
from django.utils import datetime_safe, timezone

from import_export import widgets, fields, resources
from import_export.admin import ImportExportModelAdmin
# Register your models here.


class CustomDecimalWidget(widgets.DecimalWidget):
    def clean(self, value, row=None, *args, **kwargs):
        if self.is_empty(value):
            return None
        # return Decimal(str(value))
        return Decimal(str(value).replace(",", ""))


class CustomDateTimeWidget(widgets.DateTimeWidget):
    def clean(self, value, row=None, *args, **kwargs):
        if not value:
            return None
        if isinstance(value, datetime):
            return value
        for format in self.formats:
            try:
                dt = datetime.strptime(value, format)
                if settings.USE_TZ:
                    # make datetime timezone aware so we don't compare
                    # naive datetime to an aware one
                    dt = timezone.make_aware(dt,
                                             timezone.get_default_timezone())
                return dt
            except (ValueError, TypeError):
                ET = tz.gettz('US/Eastern')
                CT = tz.gettz('US/Central')
                MT = tz.gettz('US/Mountain')
                PT = tz.gettz('US/Pacific')

                us_tzinfos = {'CST': CT, 'CDT': CT,
                              'EST': ET, 'EDT': ET,
                              'MST': MT, 'MDT': MT,
                              'PST': PT, 'PDT': PT}

                try:
                    dt = parse(value, tzinfos=us_tzinfos)
                    return dt
                except (ValueError, TypeError):
                    continue

        raise ValueError("Enter a valid date/time.")


class TransactionResource(resources.ModelResource):

    date_time = fields.Field(
        column_name='date/time', attribute='date_time', widget=CustomDateTimeWidget())
    settlement_id = fields.Field(
        column_name='settlement id', attribute='settlement_id')
    order_id = fields.Field(column_name='order id', attribute='order_id')
    product_sales = fields.Field(
        column_name='product sales', attribute='product_sales', widget=CustomDecimalWidget())
    total = fields.Field(column_name='total',
                         attribute='total', widget=CustomDecimalWidget())

    class Meta:
        model = Transaction
        exclude = ('id', )
        export_order = ('date_time', 'settlement_id', 'types', 'order_id', 'sku', 'description', 'quantity', 'product_sales',
                        'total')


class TransactionAdmin(ImportExportModelAdmin):

    list_display = ('order_id', 'date_time', 'settlement_id', 'types',  'sku', 'description', 'quantity', 'product_sales',
                    'total')
    search_fields = ['order_id']
    resource_class = TransactionResource

    def get_ordering(self, request):
        return ['date_time']


admin.site.register(Transaction, TransactionAdmin)
