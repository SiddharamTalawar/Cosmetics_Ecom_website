from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.ProductListCreateAPIView.as_view(), name='products'),
    path('Search/', views.SearchApiView.as_view(), name='Search'),
    path('Caregory/', views.CaregorySortApiView.as_view(), name='Caregory'),
]
