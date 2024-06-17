from django.shortcuts import render
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view


class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class SearchApiView(APIView):
    serializer_class = ProductSerializer
    def post(self, request, format=None):
        searched = self.request.data.get('searched')
        if searched is not None:
            products = Product.objects.filter(product_name__icontains=searched)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        else:
            return Response({"products": "No products found"}, status=status.HTTP_404_NOT_FOUND)
    

class CaregorySortApiView(APIView):
    serializer_class = ProductSerializer
    def post(self, request, format=None):
        category = self.request.data.get('category')
        if category is not None:
            products = Product.objects.filter(category=category)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        else:
            return Response({"products": "No products found"}, status=status.HTTP_404_NOT_FOUND)