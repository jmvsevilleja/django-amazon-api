from rest_framework import serializers
from transaction.models import Transaction

# Transaction Serializer


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = '__all__'
        #fields = ('id', 'productId')

        # email = serializers.EmailField()
        # username = serializers.CharField(max_length=100)
