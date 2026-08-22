from django.db import models
from django.contrib.auth.models import User

# Gender Choices
GENDER_CHOICES = (
    ('women', 'Women'),
    ('men', 'Men'),
    ('kids', 'Kids'),
    ('ethnic', 'Ethnic'),
    ('all', 'All')
)

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, default='women')
    image = models.ImageField(upload_to='categories/', null=True, blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return f"{self.gender.upper()} - {self.name}"


class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=250)
    slug = models.SlugField(unique=True, null=True, blank=True)
    description = models.TextField()
    fabric_care = models.TextField(help_text="e.g. 100% Organic Cotton. Dry Clean Only.", null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, help_text="For Discount display")
    stock = models.IntegerField(default=10)
    sizes = models.CharField(max_length=100, default="S, M, L, XL", help_text="Comma separated: S, M, L, XL")
    colors = models.CharField(max_length=150, default="Black, White", help_text="Comma separated: Black, White, Beige")
    is_featured = models.BooleanField(default=False)
    is_new_arrival = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/')
    alt_text = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return f"Image for {self.product.name}"

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishlist')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product') # Duplicate entry રોકવા માટે

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"


class Order(models.Model):
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Processing', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    full_name = models.CharField(max_length=200, default='')
    email = models.EmailField(default='')
    phone = models.CharField(max_length=15, default='')
    shipping_address = models.TextField()
    city = models.CharField(max_length=100, default='')
    pincode = models.CharField(max_length=10, default='')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50, default='COD') # COD or Razorpay
    is_paid = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    size = models.CharField(max_length=20, default='M')
    color = models.CharField(max_length=50, default='Default')
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"


class Review(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(default=5)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.product.name} ({self.rating} Stars)"