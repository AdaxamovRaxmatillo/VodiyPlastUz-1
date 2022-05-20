from django.urls import path
from .views import admin_login, admin_main, admin_products, post, edit_product, add_product, search

app_name = "main2"

urlpatterns = [
    path('login/', admin_login, name='admin_login'),
    path('main/', admin_main, name='admin_main'),
    path('product/<int:cat_id>/', admin_products, name='admin_products'),
    path('post/', post, name='post'),
    path('editproduct/<int:pr_id>/', edit_product, name="edit_product"),
    path('product/addproduct/', add_product, name="add_product"),
    path('search/', search, name="search")
]