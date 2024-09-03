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
import json
import os
import stripe
from products.tasks import send_mail_to_customer, send_receipt_to_email
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives


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
        total_price = 0
        first_name = self.request.data.get('first_name')
        last_name = self.request.data.get('last_name')
        email = self.request.data.get('email')
        contact = self.request.data.get('contact')
        address = self.request.data.get('address')
        picode = self.request.data.get('pincode')
        PaymentMethod = self.request.data.get('payment_method')
        cartItems = self.request.data.get('cartItems')
        # print("cartitems............", cartItems)
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
            total_price += product.product_price*int(item['quantity'])

        # context for email
        context_data = {
            "order_id": order.id,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "contact": contact,
            "address": address,
            "pincode": picode,
            "total_price": total_price,
            "cartItems": cartItems
        }
        if PaymentMethod == 'cod':

            # calling celery task to send mail
            send_receipt_to_email.delay(context_data)

            # order.paid = True
            # order.paid_amount = total_price
            # order.save()
            return Response({"message": "Checkout successful", "total_price": total_price}, status=status.HTTP_200_OK)
        else:
            payment = create_payment(total_price)

            # calling celery task to send mail
            print("calling send_order_conformation_mail ")
            send_receipt_to_email.delay(context_data)

            # order.paid = True
            # order.paid_amount = total_price
            # order.save()
            # return Response(payment, status=status.HTTP_200_OK)
        return Response({"message": "Checkout successful", "total_price": total_price, "payment": payment}, status=status.HTTP_200_OK)


stripe.api_key = 'sk_test_51PVreY2Kpxj32LXyNEApLUIjXVT2g1WMKaeY7TsU6aeHWmkrXouN0uFw9hKXfQcv3GNIePPtl85AAVGWgkYYEoN500t5ZD10Kj'
# stripe.api_key = 'sk_test_51OWDBFSHNLEdEMRacx8rkbyvlCpe07CiVoKazwDgRRiMgd1w9i7x1Jjf4RmGI6JnapImLhVtXHQtqnsq32YqpHvi0035EBhVBz'


def create_payment(total_price):
    try:
        # data = json.loads(request.data)
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=int(total_price),
            currency='usd',
            # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return {
            'clientSecret': intent['client_secret']
        }
    except Exception as e:
        return {"error": str(e)}


class send_order_conformation_mail(APIView):

    def post(self, request, format=None):
        print("calling send_order_conformation_mail ")
        username = self.request.data.get('username')
        useremail = self.request.data.get('useremail')
        result = send_mail_to_customer.delay(username, useremail)
        # print(result.ready())
        return Response({"message": "message sent successful"}, status=status.HTTP_200_OK)
