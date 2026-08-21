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






import os
import razorpay

from django.db.models import Q
from django.contrib.auth.models import User

from rest_framework import viewsets, generics, status, permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from .models import Product, Category, Order, OrderItem, Wishlist, Review

from .serializers import (
    ProductSerializer,
    CategorySerializer,
    OrderSerializer,
    WishlistSerializer,
    ReviewSerializer
)


# ============================================================
# RAZORPAY CONFIGURATION
# ============================================================

RAZORPAY_KEY_ID = os.environ.get("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.environ.get("RAZORPAY_KEY_SECRET")

client = razorpay.Client(
    auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
)


# ============================================================
# 1. USER REGISTER VIEW
# ============================================================

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email", "")

        if not username or not password:
            return Response(
                {
                    "error": "Username and password are required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {
                    "error": "Username already exists"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        User.objects.create_user(
            username=username,
            password=password,
            email=email
        )

        return Response(
            {
                "message": "User registered successfully"
            },
            status=status.HTTP_201_CREATED
        )


# ============================================================
# 2. CATEGORY VIEWSET
# ============================================================

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


# ============================================================
# 3. PRODUCT VIEWSET
# ============================================================

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Product.objects.all().order_by("-created_at")

        gender = self.request.query_params.get("gender")
        category_param = self.request.query_params.get("category")
        size = self.request.query_params.get("size")
        min_price = self.request.query_params.get("min_price")
        max_price = self.request.query_params.get("max_price")
        search = self.request.query_params.get("search")

        # Gender Filter
        if gender and gender.lower() != "all":
            queryset = queryset.filter(
                category__gender__iexact=gender
            )

        # Category Filter
        if category_param:
            if category_param.isdigit():
                queryset = queryset.filter(
                    category_id=int(category_param)
                )
            else:
                queryset = queryset.filter(
                    category__name__icontains=category_param
                )

        # Size Filter
        if size:
            queryset = queryset.filter(
                sizes__icontains=size
            )

        # Price Filter
        if min_price and max_price:
            queryset = queryset.filter(
                price__gte=min_price,
                price__lte=max_price
            )

        # Search
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search)
                | Q(description__icontains=search)
            )

        return queryset


# ============================================================
# 4. ORDER VIEWSET
# ============================================================

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        ).order_by("-created_at")

    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        items_data = data.pop("items", [])

        order = Order.objects.create(
            user=request.user,
            full_name=data.get("full_name", ""),
            email=data.get("email", ""),
            phone=data.get("phone", ""),
            shipping_address=data.get("shipping_address", ""),
            city=data.get("city", ""),
            pincode=data.get("pincode", ""),
            total_price=data.get("total_price", 0),
            payment_method=data.get("payment_method", "COD"),
            is_paid=data.get("is_paid", False)
        )

        for item in items_data:
            OrderItem.objects.create(
                order=order,
                product_id=item.get("product_id") or item.get("id"),
                quantity=item.get("quantity", 1),
                size=item.get("size", ""),
                color=item.get("color", ""),
                price=item.get("price", 0)
            )

        serializer = self.get_serializer(order)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


# ============================================================
# 5. WISHLIST VIEWSET
# ============================================================

class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(
            user=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )


# ============================================================
# 6. REVIEW VIEWSET
# ============================================================

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]

        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        queryset = Review.objects.all().order_by("-created_at")

        product_id = self.request.query_params.get("product")

        if product_id:
            queryset = queryset.filter(
                product_id=product_id
            )

        return queryset

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )


# ============================================================
# 7. RAZORPAY ORDER CREATION
# ============================================================

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_razorpay_order(request):

    try:

        # Check Razorpay credentials
        if not RAZORPAY_KEY_ID or not RAZORPAY_KEY_SECRET:
            return Response(
                {
                    "error": "Razorpay credentials are not configured on the server."
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Get amount from frontend
        amount_value = request.data.get("amount")

        if amount_value is None:
            return Response(
                {
                    "error": "Amount is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Convert amount to float
        try:
            amount_value = float(amount_value)
        except (ValueError, TypeError):
            return Response(
                {
                    "error": "Invalid amount."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Amount must be greater than 0
        if amount_value <= 0:
            return Response(
                {
                    "error": "Amount must be greater than 0."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Convert Rupees to Paise
        amount = int(round(amount_value * 100))

        # Create Razorpay order
        razorpay_order = client.order.create(
            {
                "amount": amount,
                "currency": "INR",
                "payment_capture": 1
            }
        )

        return Response(
            {
                "order_id": razorpay_order["id"],
                "amount": amount,
                "currency": "INR",
                "key": RAZORPAY_KEY_ID
            },
            status=status.HTTP_200_OK
        )

    except Exception as e:

        print("Razorpay Error:", str(e))

        return Response(
            {
                "error": str(e)
            },
            status=status.HTTP_400_BAD_REQUEST
        )