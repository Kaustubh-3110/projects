from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, OrderView, register_user
from .views import ProductViewSet, OrderView, register_user, update_payment_status
from .views import ContactMessageCreateView

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),

    path('orders/', OrderView.as_view(), name='orders'),
    path('register/', register_user, name='register'),
    path("orders/<int:order_id>/payment/", update_payment_status),
    path('contact/', ContactMessageCreateView.as_view(), name='contact'),
]