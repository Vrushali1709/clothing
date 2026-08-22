# from rest_framework import serializers
# from django.contrib.auth.models import User
# from .models import Category, Product, ProductImage, Order, OrderItem, Wishlist, Review

# # 1. Category Serializer
# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = '__all__'

# # 2. Product Image Serializer (Fixed to return full absolute URL)
# class ProductImageSerializer(serializers.ModelSerializer):
#     image = serializers.SerializerMethodField()

#     class Meta:
#         model = ProductImage
#         fields = ['id', 'image', 'alt_text']

#     def get_image(self, obj):
#         request = self.context.get('request')
#         if obj.image:
#             img_url = obj.image.url
#             if request:
#                 return request.build_absolute_uri(img_url)
#             return img_url
#         return None

# # 3. Product Serializer (Fixed to supply direct 'image' string URL for frontend cards)
# class ProductSerializer(serializers.ModelSerializer):
#     images = ProductImageSerializer(many=True, read_only=True)
#     category_name = serializers.ReadOnlyField(source='category.name')
#     image = serializers.SerializerMethodField() # Frontend main product card mate direct image

#     class Meta:
#         model = Product
#         fields = '__all__'

#     def get_image(self, obj):
#         request = self.context.get('request')
#         first_img = obj.images.first()
#         if first_img and first_img.image:
#             img_url = first_img.image.url
#             if request:
#                 return request.build_absolute_uri(img_url)
#             return img_url
#         return None

# # 4. Order Item Serializer
# class OrderItemSerializer(serializers.ModelSerializer):
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

# # 7. Review Serializer (Safe with MethodField)
# class ReviewSerializer(serializers.ModelSerializer):
#     user_name = serializers.SerializerMethodField()

#     class Meta:
#         model = Review
#         fields = ['id', 'product', 'user_name', 'rating', 'comment', 'created_at']

#     def get_user_name(self, obj):
#         if obj and obj.user:
#             return obj.user.username
#         return "Anonymous"








from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Product, ProductImage, Order, OrderItem, Wishlist, Review

# 1. Category Serializer (Fixed for Category circular images)
class CategorySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            img_url = obj.image.url
            if request:
                return request.build_absolute_uri(img_url)
            return img_url
        return None

# 2. Product Image Serializer
class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            img_url = obj.image.url
            if request:
                return request.build_absolute_uri(img_url)
            return img_url
        return None

# 3. Product Serializer (Fixed for product cards)
class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    category_name = serializers.ReadOnlyField(source='category.name')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        first_img = obj.images.first()
        if first_img and first_img.image:
            img_url = first_img.image.url
            if request:
                return request.build_absolute_uri(img_url)
            return img_url
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

# 7. Review Serializer
class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'product', 'user_name', 'rating', 'comment', 'created_at']

    def get_user_name(self, obj):
        if obj and obj.user:
            return obj.user.username
        return "Anonymous"