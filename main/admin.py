from django.contrib import admin

from .models import (CertificatesCategories,
                     CategoryFiles,
                     ProductCategory1,
                     ProductCategory2,
                     ProductCategory3,
                     Product,
                     Assignment,
                     Cities,
                     ProductProperty,
                     Post)


# Register your models here.

class CategoryFilesTabular(admin.TabularInline):
    model = CategoryFiles
    extra = 1


@admin.register(CertificatesCategories)
class CertificatesCategoriesAdmin(admin.ModelAdmin):
    list_display = ['name']
    inlines = [CategoryFilesTabular]


@admin.register(CategoryFiles)
class CategoryFilesAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(ProductCategory1)
class ProductCategory1Admin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(ProductCategory2)
class ProductCategory2Admin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(ProductCategory3)
class ProductCategory3Admin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name']


admin.site.register(Assignment)
admin.site.register(Cities)
admin.site.register(ProductProperty)
admin.site.register(Post)