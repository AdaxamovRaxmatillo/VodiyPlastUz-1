import os
from django.db import models

# Create your models here.


class CertificatesCategories(models.Model):
    name = models.CharField("Sertifikatlar kategoriyasi",max_length=150)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-id']
        verbose_name = "Certificates Categories"
        verbose_name_plural = "Certificates Categories"


class CategoryFiles(models.Model):
    bind = models.ForeignKey(CertificatesCategories, on_delete=models.CASCADE)
    image = models.ImageField("Fayl rasmi", upload_to='images/documents/')
    file = models.FileField("Fayl", upload_to='files/documents/')
    name = models.CharField("Fayl nomi", max_length=150)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def get_size(self):
        size = os.path.getsize(f"./{self.file.url}")
        if size < 1024:
            return f"{size} bytes"
        elif size < 1024 * 1024:
            return f"{round(size / 1024, 2)} KB"
        elif size < 1024 * 1024 * 1024:
            return f"{round(size / (1024 * 1024), 2)} MB"
        elif size < 1024 * 1024 * 1024 * 1024:
            return f"{round(size / (1024 * 1024 * 1024), 2)} GB"

    class Meta:
        ordering = ['-id']
        verbose_name = 'Category Files'
        verbose_name_plural = 'Category Files'


class ProductCategory1(models.Model):
    name = models.CharField("Mahsulot bosh kategoriyasi", max_length=150)
    short = models.CharField("Qisqa nomi", max_length=100)
    imgon = models.ImageField("Mahsulot rasmi #1", upload_to="images/product categories/")
    imgunder = models.ImageField("Mahsulot rasmi #2", upload_to="images/product categories/")
    imgmobile = models.ImageField("Mahsulot rasmi telefo'nda", upload_to="images/product categories/")
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name



    class Meta:
        verbose_name = "Product Category1"
        verbose_name_plural = "Product Categories1"

class ProductCategory2(models.Model):
    name = models.CharField("Sertifikatlar kategoriyasi",max_length=150)
    bind = models.ForeignKey(ProductCategory1, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Product Categories2"
        verbose_name_plural = "Product Categories2"


class ProductCategory3(models.Model):
    name = models.CharField("Sertifikatlar kategoriyasi", max_length=150)
    bind = models.ForeignKey(ProductCategory2, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

    def len(self):
        length = len(Product.objects.select_related("bind").filter(bind=self.id).filter(show=True))
        return length

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Product Categories3"
        verbose_name_plural = "Product Categories3"


class Product(models.Model):
    bind = models.ForeignKey(ProductCategory3, on_delete=models.CASCADE)
    name = models.CharField("Tovar nomi", max_length=500)
    show = models.BooleanField(default=True)
    img = models.ImageField("Tovar rasmi", upload_to="images/products/")
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-id']


class ProductProperty(models.Model):
    bind = models.ForeignKey(Product,on_delete=models.CASCADE)
    name = models.CharField("Tovar qiymati nomi",max_length=500)
    value = models.CharField("*", max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Product property'
        verbose_name_plural = 'Product properties'


class Cities(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-id']
        verbose_name = 'City'
        verbose_name_plural = 'Cities'


class Assignment(models.Model):
    name = models.CharField(max_length=100)
    number = models.PositiveIntegerField()
    date = models.DateField(auto_now_add=True)
    bind = models.ForeignKey(ProductCategory1, on_delete=models.CASCADE)
    email = models.CharField(max_length=100, blank=True)
    city = models.ForeignKey(Cities, on_delete=models.CASCADE)
    message = models.TextField()
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-id']

class Post(models.Model):
    img = models.ImageField(upload_to="images/post/")
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[0:50]

    class Meta:
        ordering = ['-id']
