from django.shortcuts import render
from rest_framework import generics
from .models import Product, Category, OrderItem, checkoutOrder
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
        

class CheckoutApiView(APIView):
    def post(self, request, format=None):
        first_name = self.request.data.get('first_name')
        last_name = self.request.data.get('last_name')
        email = self.request.data.get('email')
        contact = self.request.data.get('contact')  
        address = self.request.data.get('address')
        picode = self.request.data.get('pincode')
        PaymentMethod = self.request.data.get('payment_method')
        cartItems = self.request.data.get('cartItems')
        order = checkoutOrder.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            contact=contact,
            address=address,
            pincode=picode,
            
            
        )
        for item in cartItems:
            product = Product.objects.get(id=item['product']['id'])
            OrderItem.objects.create(
                product=product,
                order=order,
                price=product.product_price*int(item['quantity']),
                quantity=item['quantity']
            )
        
        return Response({"message": "Checkout successful"}, status=status.HTTP_200_OK)