from rest_framework import serializers
from inventory.models import Inventory

# Inventory Serializer


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'
        #fields = ('id', 'productId')

        # email = serializers.EmailField()
        # username = serializers.CharField(max_length=100)

# class OtherSerializer(serializers.Serializer):
#     user = InventorySerializer()
#     content = serializers.CharField(max_length=200)
#     created = serializers.DateTimeField()
