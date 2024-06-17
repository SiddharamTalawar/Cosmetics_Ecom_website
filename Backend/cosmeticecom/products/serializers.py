from rest_framework import serializers
from .models import Product
from .models import Category


class ProductSerializer(serializers.ModelSerializer):
    # category = serializers.ReadOnlyField(source='category.name')
    class Meta:
        model = Product
        fields = '__all__'
        depth = 1


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
