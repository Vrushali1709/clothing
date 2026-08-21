# from rest_framework import serializers
# from .models import Category, Product, Order, OrderItem

# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = '__all__'

# # class ProductSerializer(serializers.ModelSerializer):
# #     category_name = serializers.ReadOnlyField(source='category.name')

# #     class Meta:
# #         model = Product
# #         fields = '__all__'

# class ProductSerializer(serializers.ModelSerializer):
#     category_name = serializers.ReadOnlyField(source='category.name')
#     category_gender = serializers.ReadOnlyField(source='category.gender')

#     class Meta:
#         model = Product
#         fields = '__all__'

# class OrderItemSerializer(serializers.ModelSerializer):
#     product_name = serializers.ReadOnlyField(source='product.name')
#     product_image = serializers.ImageField(source='product.image', read_only=True)

#     class Meta:
#         model = OrderItem
#         fields = ['id', 'product', 'product_name', 'product_image', 'quantity', 'size', 'color', 'price']

# class OrderSerializer(serializers.ModelSerializer):
#     items = OrderItemSerializer(many=True)

#     class Meta:
#         model = Order
#         fields = ['id', 'total_price', 'shipping_address', 'phone', 'created_at', 'items']

#     def create(self, validated_data):
#         items_data = validated_data.pop('items')
#         user = self.context['request'].user
#         order = Order.objects.create(user=user, **validated_data)
#         for item_data in items_data:
#             OrderItem.objects.create(order=order, **item_data)
#         return order












from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Product, ProductImage, Order, OrderItem, Wishlist, Review

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

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        img = getattr(obj, 'image', None) or getattr(obj, 'image_url', None)
        
        if img:
            request = self.context.get('request')
            if hasattr(img, 'url') and request:
                return request.build_absolute_uri(img.url)
            elif hasattr(img, 'url'):
                return img.url
            return str(img)
            
        return None

# 4. Order Item Serializer (Includes Nested Product Info)
class OrderItemSerializer(serializers.ModelSerializer):
    # This embeds full product data (name, image, price) inside each ordered item
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



class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Review
        fields = ['id', 'product', 'user_name', 'rating', 'comment', 'created_at']
        extra_kwargs = {
            'user': {'read_only': True}
        }