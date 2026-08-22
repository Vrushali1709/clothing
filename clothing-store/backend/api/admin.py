# from django.contrib import admin
# from .models import Category, Product, ProductImage, Order, OrderItem, Wishlist, Review

# class ProductImageInline(admin.TabularInline):
#     model = ProductImage
#     extra = 3

# class ProductAdmin(admin.ModelAdmin):
#     inlines = [ProductImageInline]
#     list_display = ['name', 'category', 'price', 'stock', 'is_featured']
#     list_filter = ['category', 'is_featured']
#     search_fields = ['name', 'description']

# class OrderItemInline(admin.TabularInline):
#     model = OrderItem
#     extra = 0

# class OrderAdmin(admin.ModelAdmin):
#     inlines = [OrderItemInline]
#     list_display = ['id', 'user', 'full_name', 'total_price', 'status', 'created_at']
#     list_filter = ['status', 'created_at']

# admin.site.register(Category)
# admin.site.register(Product, ProductAdmin)
# admin.site.register(Order, OrderAdmin)
# admin.site.register(Wishlist)
# admin.site.register(Review)








from django.contrib import admin

from .models import (
    Category,
    Product,
    ProductImage,
    Order,
    OrderItem,
    Wishlist,
    Review
)


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 3


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    inlines = [ProductImageInline]

    list_display = [
        'name',
        'category',
        'price',
        'stock',
        'is_featured',
        'is_new_arrival',
        'created_at'
    ]

    list_filter = [
        'category',
        'is_featured',
        'is_new_arrival',
        'created_at'
    ]

    search_fields = [
        'name',
        'description'
    ]

    ordering = [
        '-created_at'
    ]


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['price']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    inlines = [OrderItemInline]

    list_display = [
        'id',
        'user',
        'full_name',
        'total_price',
        'payment_method',
        'is_paid',
        'status',
        'created_at'
    ]

    list_filter = [
        'status',
        'payment_method',
        'is_paid',
        'created_at'
    ]

    search_fields = [
        'full_name',
        'email',
        'phone',
        'user__username'
    ]

    readonly_fields = [
        'user',
        'total_price',
        'created_at'
    ]

    ordering = [
        '-created_at'
    ]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = [
        'name',
        'gender',
        'slug'
    ]

    list_filter = [
        'gender'
    ]

    search_fields = [
        'name',
        'slug'
    ]


@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):

    list_display = [
        'user',
        'product',
        'created_at'
    ]

    search_fields = [
        'user__username',
        'product__name'
    ]


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):

    list_display = [
        'product',
        'user',
        'rating',
        'created_at'
    ]

    list_filter = [
        'rating',
        'created_at'
    ]

    search_fields = [
        'product__name',
        'user__username',
        'comment'
    ]