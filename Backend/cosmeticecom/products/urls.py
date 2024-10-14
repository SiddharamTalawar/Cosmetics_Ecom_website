from django.urls import path
from . import views
from django.views.decorators.cache import cache_page

urlpatterns = [
    path('products/', cache_page(60*5)
         (views.ProductListCreateAPIView.as_view()), name='products'),
    path('Search/', views.SearchApiView.as_view(), name='Search'),
    path('Caregory/', views.CaregorySortApiView.as_view(), name='Caregory'),
    path('checkout/', views.CheckoutApiView.as_view(), name='checkout'),
    path('send-mail/', views.send_order_conformation_mail.as_view(), name='send-mail'),
    path('cache-test/', views.CacheTestView.as_view(), name='cache-test'),
]
