# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import CategoryViewSet, ProductViewSet, OrderViewSet, WishlistViewSet

# router = DefaultRouter()
# router.register(r'categories', CategoryViewSet, basename='category')
# router.register(r'products', ProductViewSet, basename='product')
# router.register(r'orders', OrderViewSet, basename='order')
# router.register(r'wishlist', WishlistViewSet, basename='wishlist')

# urlpatterns = [
#     path('', include(router.urls)),
# ]



from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, OrderViewSet, WishlistViewSet, ReviewViewSet, 

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'wishlist', WishlistViewSet, basename='wishlist')
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('', include(router.urls)),
   
]