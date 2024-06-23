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


class checkoutOrder(models.Model):
    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120)
    email = models.EmailField(max_length=120)
    address = models.CharField(max_length=120)
    pincode = models.CharField(max_length=120)
    contact = models.CharField(max_length=120)
    paid_amount = models.DecimalField(max_digits=100, decimal_places=2, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    paid = models.BooleanField(default=False)
    status = models.CharField(max_length=120, choices=[("Pending", "Pending"), ("Out for delivery", "Out for delivery"), ("Delivered", "Delivered")], default="Pending")

    def __str__(self):
        return self.email
    
class OrderItem(models.Model):
    product = models.ForeignKey(Product, related_name='items', on_delete=models.CASCADE)
    order = models.ForeignKey(checkoutOrder, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=100, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.product_name
    
class payment(models.Model):
    
    payment_id = models.CharField(max_length=120)
    payment_method = models.CharField(max_length=120)
    amount_paid = models.DecimalField(max_digits=100, decimal_places=2)
    status = models.CharField(max_length=120)
    created_at = models.DateTimeField(auto_now_add=True)
    order = models.ForeignKey(checkoutOrder, on_delete=models.CASCADE)

    def __str__(self):
        return self.payment_id