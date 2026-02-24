from rest_framework import serializers
from .models import Product, Order, OrderItem
from .models import ContactMessage


# ----------------------------
# Product Serializer
# ----------------------------
class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


# ----------------------------
# Order Item READ Serializer
# ----------------------------
class OrderItemReadSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity", "price_at_time"]

    def to_representation(self, instance):
        self.fields['product'].context.update(self.context)
        return super().to_representation(instance)


# ----------------------------
# Order READ Serializer
# ----------------------------
class OrderReadSerializer(serializers.ModelSerializer):
    items = OrderItemReadSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["id", "items", "payment_status", "total_price", "created_at"]


# ----------------------------
# Order CREATE Serializer
# ----------------------------
class OrderCreateSerializer(serializers.Serializer):
    items = serializers.ListField()

    def create(self, validated_data):
        user = self.context["request"].user
        items_data = validated_data["items"]

        order = Order.objects.create(
            user=user,
            total_price=0,
            payment_status="PENDING"
)

        total = 0

        for item in items_data:
            product_id = item["product_id"]
            quantity = item["quantity"]

            product = Product.objects.get(id=product_id)

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price_at_time=product.price
            )

            total += product.price * quantity

        order.total_price = total
        order.save()

        return order
    
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"