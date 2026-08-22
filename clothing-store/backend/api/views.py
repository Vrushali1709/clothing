# import razorpay
# from django.db.models import Q
# from django.contrib.auth.models import User
# from rest_framework import viewsets, generics, status, permissions
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.decorators import api_view, permission_classes

# from .models import Product, Category, Order, OrderItem, Wishlist, Review
# from .serializers import (
#     ProductSerializer, 
#     CategorySerializer, 
#     OrderSerializer, 
#     WishlistSerializer,
#     ReviewSerializer
# )

# # Razorpay Credentials
# RAZORPAY_KEY_ID = 'rzp_test_your_key_id'
# RAZORPAY_KEY_SECRET = 'your_key_secret'

# client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

# # 1. User Register View
# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = [AllowAny]
    
#     def post(self, request, *args, **kwargs):
#         username = request.data.get('username')
#         password = request.data.get('password')
#         email = request.data.get('email', '')
        
#         if not username or not password:
#             return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
#         if User.objects.filter(username=username).exists():
#             return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
#         User.objects.create_user(username=username, password=password, email=email)
#         return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)


# # 2. Category ViewSet
# class CategoryViewSet(viewsets.ModelViewSet):
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     permission_classes = [AllowAny]


# # 3. Product ViewSet (FIXED CATEGORY FILTER)
# class ProductViewSet(viewsets.ModelViewSet):
#     serializer_class = ProductSerializer
#     permission_classes = [AllowAny]

#     def get_queryset(self):
#         queryset = Product.objects.all().order_by('-created_at')
#         gender = self.request.query_params.get('gender')
#         category_param = self.request.query_params.get('category')
#         size = self.request.query_params.get('size')
#         min_price = self.request.query_params.get('min_price')
#         max_price = self.request.query_params.get('max_price')
#         search = self.request.query_params.get('search')

#         # Gender Filter
#         if gender and gender.lower() != 'all':
#             queryset = queryset.filter(category__gender__iexact=gender)

#         # Sub-category Filter (Handles Category Name or ID)
#         if category_param:
#             if category_param.isdigit():
#                 queryset = queryset.filter(category_id=int(category_param))
#             else:
#                 queryset = queryset.filter(category__name__icontains=category_param)

#         if size:
#             queryset = queryset.filter(sizes__icontains=size)
#         if min_price and max_price:
#             queryset = queryset.filter(price__gte=min_price, price__lte=max_price)
#         if search:
#             queryset = queryset.filter(Q(name__icontains=search) | Q(description__icontains=search))

#         return queryset


# # 4. Order ViewSet
# class OrderViewSet(viewsets.ModelViewSet):
#     serializer_class = OrderSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Order.objects.filter(user=self.request.user).order_by('-created_at')

#     def create(self, request, *args, **kwargs):
#         data = request.data
#         items_data = data.pop('items', [])
        
#         order = Order.objects.create(
#             user=request.user,
#             full_name=data.get('full_name', ''),
#             email=data.get('email', ''),
#             phone=data.get('phone', ''),
#             shipping_address=data.get('shipping_address', ''),
#             city=data.get('city', ''),
#             pincode=data.get('pincode', ''),
#             total_price=data.get('total_price', 0),
#             payment_method=data.get('payment_method', 'COD'),
#             is_paid=data.get('is_paid', False)
#         )

#         for item in items_data:
#             OrderItem.objects.create(
#                 order=order,
#                 product_id=item.get('product_id') or item.get('id'),
#                 quantity=item.get('quantity', 1),
#                 size=item.get('size', ''),
#                 color=item.get('color', ''),
#                 price=item.get('price', 0)
#             )

#         serializer = self.get_serializer(order)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


# # 5. Wishlist ViewSet
# class WishlistViewSet(viewsets.ModelViewSet):
#     serializer_class = WishlistSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return Wishlist.objects.filter(user=self.request.user)

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)


# class ReviewViewSet(viewsets.ModelViewSet):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer

#     def get_permissions(self):
#         if self.action in ['list', 'retrieve']:
#             return [permissions.AllowAny()]
#         return [permissions.IsAuthenticated()]

#     def get_queryset(self):
#         queryset = Review.objects.all().order_by('-created_at')
#         product_id = self.request.query_params.get('product')
#         if product_id:
#             queryset = queryset.filter(product_id=product_id)
#         return queryset

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)


# # 6. Razorpay Order Creation Endpoint
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_razorpay_order(request):
#     try:
#         amount = int(float(request.data.get('amount')) * 100) # Convert to Paise
#         razorpay_order = client.order.create({
#             "amount": amount,
#             "currency": "INR",
#             "payment_capture": "1"
#         })
#         return Response({
#             "order_id": razorpay_order['id'],
#             "amount": amount,
#             "currency": "INR",
#             "key": RAZORPAY_KEY_ID
#         }, status=status.HTTP_200_OK)
#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)





# from django.db.models import Q
# from django.contrib.auth.models import User
# from rest_framework import viewsets, generics, status, permissions
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.response import Response

# from .models import Product, Category, Order, OrderItem, Wishlist, Review
# from .serializers import (
#     ProductSerializer, 
#     CategorySerializer, 
#     OrderSerializer, 
#     WishlistSerializer,
#     ReviewSerializer
# )

# # 1. User Register View
# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = [AllowAny]
    
#     def post(self, request, *args, **kwargs):
#         username = request.data.get('username')
#         password = request.data.get('password')
#         email = request.data.get('email', '')
        
#         if not username or not password:
#             return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
#         if User.objects.filter(username=username).exists():
#             return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
#         User.objects.create_user(username=username, password=password, email=email)
#         return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)


# # 2. Category ViewSet
# class CategoryViewSet(viewsets.ModelViewSet):
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     permission_classes = [AllowAny]


# # 3. Product ViewSet
# class ProductViewSet(viewsets.ModelViewSet):
#     serializer_class = ProductSerializer
#     permission_classes = [AllowAny]

#     def get_queryset(self):
#         queryset = Product.objects.all().order_by('-created_at')
#         gender = self.request.query_params.get('gender')
#         category_param = self.request.query_params.get('category')
#         size = self.request.query_params.get('size')
#         min_price = self.request.query_params.get('min_price')
#         max_price = self.request.query_params.get('max_price')
#         search = self.request.query_params.get('search')

#         if gender and gender.lower() != 'all':
#             queryset = queryset.filter(category__gender__iexact=gender)

#         if category_param:
#             if category_param.isdigit():
#                 queryset = queryset.filter(category_id=int(category_param))
#             else:
#                 queryset = queryset.filter(category__name__icontains=category_param)

#         if size:
#             queryset = queryset.filter(sizes__icontains=size)
#         if min_price and max_price:
#             queryset = queryset.filter(price__gte=min_price, price__lte=max_price)
#         if search:
#             queryset = queryset.filter(Q(name__icontains=search) | Q(description__icontains=search))

#         return queryset


# # 4. Order ViewSet
# class OrderViewSet(viewsets.ModelViewSet):
#     serializer_class = OrderSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Order.objects.filter(user=self.request.user).order_by('-created_at')

#     def create(self, request, *args, **kwargs):
#         data = request.data
#         items_data = data.pop('items', [])
        
#         order = Order.objects.create(
#             user=request.user,
#             full_name=data.get('full_name', ''),
#             email=data.get('email', ''),
#             phone=data.get('phone', ''),
#             shipping_address=data.get('shipping_address', ''),
#             city=data.get('city', ''),
#             pincode=data.get('pincode', ''),
#             total_price=data.get('total_price', 0),
#             payment_method=data.get('payment_method', 'COD'),
#             is_paid=data.get('is_paid', True) # Direct true for seamless testing
#         )

#         for item in items_data:
#             OrderItem.objects.create(
#                 order=order,
#                 product_id=item.get('product_id') or item.get('id'),
#                 quantity=item.get('quantity', 1),
#                 size=item.get('size', ''),
#                 color=item.get('color', ''),
#                 price=item.get('price', 0)
#             )

#         serializer = self.get_serializer(order)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


# # 5. Wishlist ViewSet
# class WishlistViewSet(viewsets.ModelViewSet):
#     serializer_class = WishlistSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return Wishlist.objects.filter(user=self.request.user)

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)


# # 6. Review ViewSet
# class ReviewViewSet(viewsets.ModelViewSet):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer

#     def get_permissions(self):
#         if self.action in ['list', 'retrieve']:
#             return [permissions.AllowAny()]
#         return [permissions.IsAuthenticated()]

#     def get_queryset(self):
#         queryset = Review.objects.all().order_by('-created_at')
#         product_id = self.request.query_params.get('product')
#         if product_id:
#             queryset = queryset.filter(product_id=product_id)
#         return queryset

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)








from django.db import transaction
from django.db.models import Q
from django.contrib.auth.models import User

from rest_framework import (
    viewsets,
    generics,
    status,
    permissions,
    serializers

)

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)

from rest_framework.response import Response

from .models import (
    Product,
    Category,
    Order,
    OrderItem,
    Wishlist,
    Review
)

from .serializers import (
    ProductSerializer,
    CategorySerializer,
    OrderSerializer,
    WishlistSerializer,
    ReviewSerializer,
    UserSerializer
)


# =========================================================
# USER REGISTER
# =========================================================

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email', '')

        if not username or not password:
            return Response(
                {
                    'error': 'Username and password are required'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {
                    'error': 'Username already exists'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if email and User.objects.filter(email=email).exists():
            return Response(
                {
                    'error': 'Email already exists'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(
            username=username,
            password=password,
            email=email
        )

        return Response(
            {
                'message': 'User registered successfully',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            },
            status=status.HTTP_201_CREATED
        )


# =========================================================
# USER PROFILE
# =========================================================

class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


# =========================================================
# CATEGORY
# =========================================================

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


# =========================================================
# PRODUCT
# =========================================================

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Product.objects.all().order_by('-created_at')

        gender = self.request.query_params.get('gender')
        category_param = self.request.query_params.get('category')
        size = self.request.query_params.get('size')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        search = self.request.query_params.get('search')

        # Gender
        if gender and gender.lower() != 'all':
            queryset = queryset.filter(
                category__gender__iexact=gender
            )

        # Category
        if category_param:
            if category_param.isdigit():
                queryset = queryset.filter(
                    category_id=int(category_param)
                )
            else:
                queryset = queryset.filter(
                    category__name__icontains=category_param
                )

        # Size
        if size:
            queryset = queryset.filter(
                sizes__icontains=size
            )

        # Price
        if min_price:
            queryset = queryset.filter(
                price__gte=min_price
            )

        if max_price:
            queryset = queryset.filter(
                price__lte=max_price
            )

        # Search
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(description__icontains=search)
            )

        return queryset


# =========================================================
# ORDER
# =========================================================

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Order.objects
            .filter(user=self.request.user)
            .prefetch_related(
                'items',
                'items__product',
                'items__product__images'
            )
            .order_by('-created_at')
        )

    def update(self, request, *args, **kwargs):
        return Response(
            {
                'error': 'Orders cannot be edited.'
            },
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    def partial_update(self, request, *args, **kwargs):
        return Response(
            {
                'error': 'Orders cannot be edited.'
            },
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    def destroy(self, request, *args, **kwargs):
        return Response(
            {
                'error': 'Orders cannot be deleted.'
            },
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    @transaction.atomic
    def create(self, request, *args, **kwargs):

        data = request.data.copy()

        items_data = data.pop('items', [])

        if not items_data:
            return Response(
                {
                    'error': 'Order must contain at least one item.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        total_price = 0

        validated_items = []

        # -----------------------------------------
        # Validate products & stock
        # -----------------------------------------

        for item in items_data:

            product_id = (
                item.get('product_id')
                or item.get('id')
                or item.get('product')
            )

            quantity = int(
                item.get('quantity', 1)
            )

            if not product_id:
                return Response(
                    {
                        'error': 'Product ID is required.'
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            if quantity <= 0:
                return Response(
                    {
                        'error': 'Quantity must be greater than 0.'
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                product = Product.objects.select_for_update().get(
                    id=product_id
                )
            except Product.DoesNotExist:
                return Response(
                    {
                        'error': f'Product {product_id} does not exist.'
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            if product.stock < quantity:
                return Response(
                    {
                        'error': f'Only {product.stock} item(s) available for {product.name}.'
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            price = product.price

            item_total = price * quantity
            total_price += item_total

            validated_items.append({
                'product': product,
                'quantity': quantity,
                'size': item.get('size', ''),
                'color': item.get('color', ''),
                'price': price
            })

        # -----------------------------------------
        # Payment
        # -----------------------------------------

        payment_method = data.get(
            'payment_method',
            'COD'
        )

        is_paid = False

        # Razorpay success પછી frontend/backend
        # separately is_paid true કરી શકે.
        if payment_method.lower() == 'razorpay':
            is_paid = bool(data.get('is_paid', False))

        # -----------------------------------------
        # Create Order
        # -----------------------------------------

        order = Order.objects.create(
            user=request.user,

            full_name=data.get(
                'full_name',
                ''
            ),

            email=data.get(
                'email',
                request.user.email
            ),

            phone=data.get(
                'phone',
                ''
            ),

            shipping_address=data.get(
                'shipping_address',
                ''
            ),

            city=data.get(
                'city',
                ''
            ),

            pincode=data.get(
                'pincode',
                ''
            ),

            total_price=total_price,

            payment_method=payment_method,

            is_paid=is_paid
        )

        # -----------------------------------------
        # Create Order Items + Reduce Stock
        # -----------------------------------------

        for item in validated_items:

            product = item['product']

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item['quantity'],
                size=item['size'],
                color=item['color'],
                price=item['price']
            )

            product.stock -= item['quantity']
            product.save(
                update_fields=['stock']
            )

        serializer = self.get_serializer(order)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


# =========================================================
# WISHLIST
# =========================================================

class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Wishlist.objects
            .filter(user=self.request.user)
            .select_related('product')
        )

    def perform_create(self, serializer):
        product = serializer.validated_data['product']

        if Wishlist.objects.filter(
            user=self.request.user,
            product=product
        ).exists():

            raise serializers.ValidationError(
                'Product is already in wishlist.'
            )

        serializer.save(
            user=self.request.user
        )


# =========================================================
# REVIEW
# =========================================================

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_permissions(self):

        if self.action in [
            'list',
            'retrieve'
        ]:
            return [permissions.AllowAny()]

        return [permissions.IsAuthenticated()]

    def get_queryset(self):

        queryset = (
            Review.objects
            .select_related('user', 'product')
            .order_by('-created_at')
        )

        product_id = self.request.query_params.get(
            'product'
        )

        if product_id:
            queryset = queryset.filter(
                product_id=product_id
            )

        return queryset

    def perform_create(self, serializer):

        product = serializer.validated_data['product']

        # One review per user per product
        if Review.objects.filter(
            user=self.request.user,
            product=product
        ).exists():

            from rest_framework.exceptions import ValidationError

            raise ValidationError(
                {
                    'error':
                    'You have already reviewed this product.'
                }
            )

        serializer.save(
            user=self.request.user
        )

    def perform_update(self, serializer):

        review = self.get_object()

        if review.user != self.request.user:
            from rest_framework.exceptions import PermissionDenied

            raise PermissionDenied(
                'You can only edit your own review.'
            )

        serializer.save()

    def perform_destroy(self, instance):

        if instance.user != self.request.user:
            from rest_framework.exceptions import PermissionDenied

            raise PermissionDenied(
                'You can only delete your own review.'
            )

        instance.delete()


# User Profile View
class ProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user

        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        })