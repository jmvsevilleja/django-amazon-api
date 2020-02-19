from django.shortcuts import render

from django.shortcuts import render

# third party imports
from rest_framework.response import Response
from rest_framework.views import APIView

from transaction.models import Transaction
from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters import FilterSet
from django_filters import rest_framework as filters


from .serializers import TransactionSerializer


# Create your views here.

class TransactionFilter(FilterSet):
    types = filters.CharFilter('types')
    from_date = filters.CharFilter(method="filter_by_from_date")
    to_date = filters.CharFilter(method="filter_by_to_date")

    def filter_by_from_date(self, queryset, name, value):
        queryset = queryset.filter(date_time__gte=value)
        return queryset

    def filter_by_to_date(self, queryset, name, value):
        queryset = queryset.filter(date_time__lte=value)
        return queryset


class TransactionView(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()
    filter_backends = (DjangoFilterBackend, SearchFilter)  # OrderingFilter,
    # ordering_fields = ('product_sales', 'total')
    # search_fields = ('order_id')
    ordering = ('-date_time')
    filter_class = TransactionFilter
