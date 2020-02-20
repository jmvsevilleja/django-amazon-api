from rest_framework import serializers
from transaction.models import Transaction

# Transaction Serializer


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        #fields = '__all__'
        fields = ('id', 'order_id', 'date_time', 'settlement_id', 'types',  'sku', 'quantity', 'product_sales',
                  'total')

        # email = serializers.EmailField()
        # username = serializers.CharField(max_length=100)
