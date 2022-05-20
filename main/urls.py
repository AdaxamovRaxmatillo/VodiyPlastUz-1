from django.urls import path
from .views import (index,
                    contact, ask,
                    documents,
                    company, categories,
                    getcategory3,
                    get_product,)

app_name = "main"

urlpatterns = [
    path('', index, name="index"),
    path('contact/', contact, name="contact"),
    path('ask/', ask, name="ask"),
    path('documents/', documents, name="documents"),
    path('company/', company, name="company"),
    path('categories/', categories, name="categories"),
    path('categories/getcategory3/', getcategory3, name="getcategory3"),
    path('categories/get_product/', get_product, name="getproduct"),
]
