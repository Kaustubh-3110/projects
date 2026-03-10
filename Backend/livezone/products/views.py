from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import APIView, api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .models import ContactMessage
from .serializers import ContactMessageSerializer

from .models import Product, Order
from .serializers import (
    ProductSerializer,
    OrderReadSerializer,
    OrderCreateSerializer
)


# ----------------------------
# Product ViewSet
# ----------------------------
from rest_framework.permissions import AllowAny

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Product.objects.all()

        sort = self.request.query_params.get('sort')

        if sort == 'price_asc':
            queryset = queryset.order_by('price')

        elif sort == 'price_desc':
            queryset = queryset.order_by('-price')

        return queryset

# ----------------------------
# Order View (List + Create)
# ----------------------------
class OrderView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return OrderCreateSerializer
        return OrderReadSerializer

    def create(self, request, *args, **kwargs):
        serializer = OrderCreateSerializer(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        order = serializer.save()

        read_serializer = OrderReadSerializer(
            order,
            context={'request': request}
        )
        return Response(read_serializer.data, status=status.HTTP_201_CREATED)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_payment_status(request, order_id):
    try:
        order = Order.objects.get(id=order_id, user=request.user)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)

    status_value = request.data.get("payment_status")

    if status_value not in ["PAID", "FAILED"]:
        return Response({"error": "Invalid status"}, status=400)

    order.payment_status = status_value
    order.save()

    return Response({"message": "Payment status updated"})


# ----------------------------
# Register User
# ----------------------------
@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response(
            {"error": "Username and password required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "User already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    User.objects.create_user(username=username, password=password)

    return Response(
        {"message": "User created successfully"},
        status=status.HTTP_201_CREATED
    )

class ContactMessageCreateView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)