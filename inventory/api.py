from inventory.models import Inventory
from rest_framework import viewsets, permissions
from .serializers import InventorySerializer


# Inventory Viewset

class InventoryViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.AllowAny
    ]

    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
