from django.contrib import admin
from .models import Inventory
# Register your models here.


class InventoryAdmin(admin.ModelAdmin):

    fieldsets = [
        (None, {'fields': ['productId']}),
        (None, {'fields': ['bufferLevel']}),
        (None, {'fields': ['leadTime']}),
        (None, {'fields': ['comment']}),
    ]

    list_display = ('productId', 'bufferLevel', 'leadTime', 'comment')


admin.site.register(Inventory, InventoryAdmin)
