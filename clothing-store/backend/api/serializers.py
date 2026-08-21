# from rest_framework import serializers
# from django.contrib.auth.models import User
# from .models import Category, Product, ProductImage, Order, OrderItem, Wishlist

# # 1. Category Serializer
# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = '__all__'

# # 2. Product Image Serializer
# class ProductImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProductImage
#         fields = ['id', 'image', 'alt_text']

# # 3. Product Serializer
# class ProductSerializer(serializers.ModelSerializer):
#     images = ProductImageSerializer(many=True, read_only=True)
#     category_name = serializers.ReadOnlyField(source='category.name')

#     class Meta:
#         model = Product
#         fields = '__all__'

#     def get_image(self, obj):
#         img = getattr(obj, 'image', None) or getattr(obj, 'image_url', None)
        
#         if img:
#             request = self.context.get('request')
#             if hasattr(img, 'url') and request:
#                 return request.build_absolute_uri(img.url)
#             elif hasattr(img, 'url'):
#                 return img.url
#             return str(img)
            
#         return None

# # 4. Order Item Serializer (Includes Nested Product Info)
# class OrderItemSerializer(serializers.ModelSerializer):
#     # This embeds full product data (name, image, price) inside each ordered item
#     product_details = ProductSerializer(source='product', read_only=True)

#     class Meta:
#         model = OrderItem
#         fields = ['id', 'order', 'product', 'product_details', 'quantity', 'size', 'color', 'price']

# # 5. Order Serializer
# class OrderSerializer(serializers.ModelSerializer):
#     items = OrderItemSerializer(many=True, read_only=True)

#     class Meta:
#         model = Order
#         fields = '__all__'

# # 6. Wishlist Serializer
# class WishlistSerializer(serializers.ModelSerializer):
#     product_detail = ProductSerializer(source='product', read_only=True)

#     class Meta:
#         model = Wishlist
#         fields = ['id', 'user', 'product', 'product_detail', 'created_at']
#         extra_kwargs = {
#             'user': {'read_only': True}
#         }




from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Product, ProductImage, Order, OrderItem, Wishlist

# 1. Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

# 2. Product Image Serializer
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text']

# 3. Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    category_name = serializers.ReadOnlyField(source='category.name')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        
        # Safe check for main product image
        try:
            if obj.image and hasattr(obj.image, 'url'):
                img_url = obj.image.url
                return request.build_absolute_uri(img_url) if request else img_url
        except Exception:
            pass
            
        # Safe check for inline related images
        try:
            first_image = obj.images.first()
            if first_image and first_image.image and hasattr(first_image.image, 'url'):
                img_url = first_image.image.url
                return request.build_absolute_uri(img_url) if request else img_url
        except Exception:
            pass
            
        return None

# 4. Order Item Serializer
class OrderItemSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'product', 'product_details', 'quantity', 'size', 'color', 'price']

# 5. Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

# 6. Wishlist Serializer
class WishlistSerializer(serializers.ModelSerializer):
    product_detail = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'product', 'product_detail', 'created_at']
        extra_kwargs = {
            'user': {'read_only': True}
        }