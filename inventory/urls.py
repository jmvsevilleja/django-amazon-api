from rest_framework import routers
from django.urls import path

from inventory.views import InventoryView
from inventory.views import TestView
from rest_framework import viewsets, permissions

from .api import InventoryViewSet
from . import views

router = routers.DefaultRouter()

# From api file
# router.register('api/inventory', InventoryViewSet, 'inventory')

# From view using router.Default Router
router.register('inventory', views.InventoryView)

urlpatterns = router.urls

# urlpatterns = [
#     path('', TestView.as_view(), name='test'),  # From a view using as_view
# ]
