from django.shortcuts import render

# third party imports
from rest_framework.response import Response
from rest_framework.views import APIView

from inventory.models import Inventory
from rest_framework import viewsets, permissions
from .serializers import InventorySerializer

# Create your views here.


def index(request):
    return render(request, 'index.html')


class InventoryView(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer


class TestView(APIView):

    def get(self, request, *args, **kwargs):

        qs = Inventory.objects.all()
        post = qs.first()
        # serializer = PostSerializer(qs, many=True)
        serializer = InventorySerializer(post)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = InventorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
