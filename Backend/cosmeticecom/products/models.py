from django.db import models


class Product(models.Model):
    product_name = models.CharField(max_length=120)
    product_description = models.TextField(blank=True, null=True)
    product_price = models.DecimalField(
        max_digits=15, decimal_places=2, default=99.99)
    product_image = models.ImageField(
        upload_to='products', blank=True, null=True)
    category = models.ForeignKey(
        'Category', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.product_name

    def get_absolute_url(self):
        return f"/products/{self.id}/"

    def get_image_url(self):
        return self.product_image.url

    class Meta:
        ordering = ['product_name']

    def get_absolute_url(self):
        return f"/products/{self.id}/"

    def get_image_url(self):
        return self.product_image.url

    class Meta:
        ordering = ['product_name']


class Category(models.Model):
    category_name = models.CharField(max_length=120)

    def __str__(self):
        return self.category_name
