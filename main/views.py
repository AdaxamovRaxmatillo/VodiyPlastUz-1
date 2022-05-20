import random
from django.contrib.auth import authenticate, login
from django.core.serializers import serialize
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt

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


@csrf_exempt
def index(request):
    procuct_categories1 = ProductCategory1.objects.all()
    procuct_categories2 = ProductCategory2.objects.select_related("bind").all()
    cities = Cities.objects.all()
    posts = Post.objects.all()
    context = {
        "product_categories1": procuct_categories1,
        "procuct_categories2": procuct_categories2,
        "cities":cities,
        "posts": posts
    }
    if request.POST:
        data = {}
        new_post = request.POST
        name = new_post.get('name')
        number = new_post.get('number')
        message = new_post.get('message')
        city = new_post.get('city')
        bind = new_post.get('bind')
        if not Assignment.objects.select_related('bind').filter(number=number):
            data['status'] = 200
            new_assignment = Assignment.objects.create(name=name, number=number, city_id=city, bind_id=bind, message=message)
            new_assignment.save()
        else:
            data['status'] = 404
        return JsonResponse(data)
    return render(request, 'index.html', context)


def contact(request):
    return render(request, 'contact.html')


@csrf_exempt
def ask(request):
    data = {}
    context = {}
    verification = [
                     '4ie5l', '8xmaz', 'yrisw', 'itb45', 'p7k2i',
                     'w7f3e', 'utilo', 'r3se9', 'fxmge', 'ef10j'
                    ]
    req = request
    if req.session.get('verification') is not None:
        if req.POST:
            name = req.POST.get('name')
            number = req.POST.get('number')
            city = req.POST.get('city')
            email = req.POST.get('email')
            bind = req.POST.get('category')
            message = req.POST.get('message')
            user_ver_code = req.POST.get('verification').lower()
            if user_ver_code == req.session.get('verification'):
                data['status'] = 200
                if not Assignment.objects.select_related('bind').filter(number=number):
                    data['assignment'] = 200
                    new_assignment = Assignment.objects.create(name=name, number=number, city_id=city, email=email, bind_id=bind, message=message)
                    new_assignment.save()
                    req.session.delete()
                else:
                    data['assignment'] = 404
            else:
                data['status'] = 404
                req.session['verification'] = random.sample(verification, 1)[0]
                data['img_id'] = verification.index(req.session.get('verification')) + 1
            return JsonResponse(data)
    else:
        req.session['verification'] = random.sample(verification, 1)[0]

    context['ver'] = verification.index(req.session.get('verification'))+1
    context['category1'] = ProductCategory1.objects.all()
    context['cities'] = Cities.objects.all()

    return render(request, 'ask.html', context)

def documents(request):
    categories = CertificatesCategories.objects.all()
    context = {
        "categories": categories,
    }
    if request.GET:
        cert_id = request.GET.get("id")
        if cert_id.isdigit():
            cert_id = int(cert_id)
            res = {
                "file": CategoryFiles.objects.select_related("bind").filter(bind=cert_id)
            }
            return render(request, "dcmfile.html", res)

    return render(request, 'documents.html', context)


def company(request):
    return render(request, 'index2.html')


def categories(request):
    to = 0
    tocategory2 = 0
    procuct_categories1 = ProductCategory1.objects.all()
    procuct_categories2 = ProductCategory2.objects.select_related("bind").all()
    products = Product.objects.select_related("bind").all()
    procuct_categories3 = None
    if request.GET:
        cat1id = request.GET.get("ct1id")
        cat2id = request.GET.get("ctid2")
        to = cat1id
        if cat2id is not None:
            procuct_categories3 = ProductCategory3.objects.filter(bind=cat2id).select_related("bind")
            tocategory2 = int(cat2id)
        else:
            id2 = ProductCategory2.objects.filter(bind=cat1id).select_related("bind")[0].id
            procuct_categories3 = ProductCategory3.objects.select_related("bind").filter(bind=id2)
            tocategory2 = int(id2)

    context = {
        "product_categories1": procuct_categories1,
        "procuct_categories2": procuct_categories2,
        "to": int(to),
        "procuct_categories3": procuct_categories3,
        "tocategory2": tocategory2,
        "products": products,

    }

    return render(request, 'categories.html', context)


def getcategory3(request):
    result = ""
    if request.GET:
        cat2id = request.GET.get("ctid2")
        procuct_categories3 = ProductCategory3.objects.select_related("bind").filter(bind=cat2id)
        if procuct_categories3:
            for i in procuct_categories3:
                reshttp = ""
                respr = Product.objects.select_related("bind").filter(bind=i.id).filter(show=True)
                for z in respr:
                    if z.show:
                        reshttp += f"""
                                        <li>
                                            <a class="getproduct_single" onclick="getproduct(this)"  href="/categories/get_product/?productid={z.id}">{z.name}</a>
                                        </li>
                                    """

                result += f"""
                            <div class="category2_in_categories">
                                <div class="category2_in_name_length">
                                    <p>{i.name}</p>
                                    <p>( {len(respr)} )</p>
                                </div>
                                <div class="category2_in_items">
                                    <ul>
                                        {reshttp}
                                    </ul>
                                </div>
                            </div>
                        """
        else:
            result = "<h1 class='no_result'>продукт не найден</h1>"
        return HttpResponse(result)


def get_product(request):
    if request.GET:
        productid = request.GET.get('productid')
        result = Product.objects.select_related("bind").get(id=productid)
        procuct_categories1 = ProductCategory1.objects.all()
        procuct_categories2 = ProductCategory2.objects.select_related("bind").all()
        product_properties = ProductProperty.objects.filter(bind_id=productid)
        context = {
            "product": result,
            "product_categories1": procuct_categories1,
            "procuct_categories2": procuct_categories2,
            "to": result.bind.bind.bind.id,
            "tocategory2": result.bind.bind.id,
            "properties": product_properties
        }
        return render(request, 'categories.html', context)


def admin_login(request):
    if request.user.is_authenticated:
        return redirect('main2:admin_main')
    else:
        post = request.POST
        if post:
            user = authenticate(request, username=post.get('username'), password=post.get('password'))
            if user is not None:
                login(request, user)
                return redirect('main2:admin_main')
            else:
                context = {
                    "error_username": True
                }
                return render(request, 'admin_manage/login.html', context)
        return render(request, 'admin_manage/login.html')


def admin_main(request):
    if request.user.is_authenticated:
        data = {}
        request_get = request.GET
        if request.GET:
            if request_get.get('to_done') is not None:
                result = Assignment.objects.select_related('bind').filter(id=request_get.get('to_done'))
                result.update(done=True)
            elif request_get.get('to_false') is not None:
                result = Assignment.objects.select_related('bind').filter(id=request_get.get('to_false'))
                result.update(done=False)
            data['status'] = 200
            return JsonResponse(data)
        context = {
            "index": 0,
            "users": Assignment.objects.select_related('bind').all(),
            "search": 'assignment'
        }
        return render(request, 'admin_manage/main.html', context)
    else:
        return HttpResponse("<h1 style='text-align:center;'>You are not admin</h1>")


def admin_products(request, cat_id):
    if request.user.is_authenticated:
        category2 = ProductCategory2.objects.select_related("bind").filter(bind=cat_id)
        context = {
                "index": 1,
                "procuct_categories2": category2,
                "procuct_categories3": ProductCategory3.objects.select_related("bind").all(),
                "panel_index": cat_id-1,
                "search": cat_id
                   }
        if category2:
            context["short"] = category2[0].bind
        else:
            context["short"] = ProductCategory1.objects.get(id=cat_id)
        if request.GET:
            del_cat2 = request.GET.get("delete_category2")
            del_cat3 = request.GET.get("delete_category3")
            if del_cat2 is not None:
                ProductCategory2.objects.select_related("bind").get(id=del_cat2).delete()
            if del_cat3 is not None:
                ProductCategory3.objects.select_related("bind").get(id=del_cat3).delete()
            edit_cat2 = request.GET.get("edit_category2")
            edit_cat3 = request.GET.get("edit_category3")
            if edit_cat2 is not None:
                val = request.GET.get("val2")
                ProductCategory2.objects.select_related("bind").filter(id=edit_cat2).update(name=val)
            if edit_cat3 is not None:
                val3 = request.GET.get("val3")
                ProductCategory3.objects.select_related("bind").filter(id=edit_cat3).update(name=val3)
            add_cat2 = request.GET.get("add_category2")
            if add_cat2 is not None:
                data = {}
                val2 = request.GET.get("val2")
                cat3 = ProductCategory3.objects.select_related("bind").create(name=val2, bind_id=add_cat2)
                data['category_id'] = cat3.id
                return JsonResponse(data)
            add_cat1 = request.GET.get("add_category1")
            if add_cat1 is not None:
                data = {}
                new_cat1 = ProductCategory2.objects.select_related("bind").create(name=add_cat1, bind_id=cat_id)
                data['category_id'] = new_cat1.id
                return JsonResponse(data)
            category3_id = request.GET.get('category3')
            if category3_id is not None:
                products = Product.objects.select_related("bind").filter(bind=category3_id)
                data = {
                    "index": 1,
                    "panel_index": cat_id-1,
                    "panel_index_url": cat_id,
                    "products": products,
                    "category3": ProductCategory3.objects.select_related("bind").get(id=category3_id),
                    "category3_id": category3_id,
                    "search": f"product{category3_id}"
                   }
                return render(request, 'admin_manage/admin_products.html', data)
            add_product = request.GET.get('add_product')
            if add_product is not None:
                context = {
                    "index": 1,
                    "category3_id": add_product
                }
                return render(request, 'admin_manage/add_product.html', context)

            delete_pr = request.GET.get('delete_pr')
            if delete_pr is not None:
                Product.objects.get(id=delete_pr).delete()
            to_show = request.GET.get('to_show')
            if to_show is not None:
                Product.objects.filter(id=to_show).update(show=True)
            to_hidden = request.GET.get('to_hidden')
            if to_hidden is not None:
                Product.objects.filter(id=to_hidden).update(show=False)
        return render(request, 'admin_manage/admin_product.html', context)
    else:
        return HttpResponse("<h1 style='text-align:center;'>You are not admin</h1>")


@csrf_exempt
def post(request):
    if request.user.is_authenticated:
        if request.FILES and request.POST:
            img_id = request.POST.get('img_id')
            new_img = request.FILES.get("change_img")
            if img_id is not None and new_img is not None:
                update_img = Post.objects.get(id=img_id)
                update_img.img = new_img
                update_img.save()
        if request.GET:
            text_id = request.GET.get("text_id")
            text = request.GET.get("text")
            if text is not None and text_id is not None:
                new_text = Post.objects.get(id=text_id)
                new_text.text = text
                new_text.save()
        context = {
            "posts": Post.objects.all(),
            "index": 2
        }

        return render(request, 'admin_manage/post.html', context)
    else:
        return HttpResponse("<h1 style='text-align:center;'>You are not admin</h1>")

@csrf_exempt
def edit_product(request,pr_id):
    req = request.GET
    product = Product.objects.get(id=pr_id)
    properties = ProductProperty.objects.filter(bind_id=pr_id)
    editproduct = req.get('editproduct')
    editproduct_name = req.get('val')
    if editproduct is not None:
        Product.objects.filter(id=editproduct).update(name=editproduct_name)
    editproperty = req.get('editproperties')
    editproperty_name = req.get('name')
    editproperty_value = req.get('value')
    if editproperty is not None:
        ProductProperty.objects.filter(id=editproperty).update(name=editproperty_name, value=editproperty_value)
    if request.FILES:
        new_img = Product.objects.get(id=pr_id)
        new_img.img = request.FILES.get("data")
        new_img.save()
    delete_single = request.GET.get("delete_product_single")
    if delete_single is not None:
        Product.objects.get(id=delete_single).delete()
    context = {
        "index": 1,
        "product": product,
        "properties": properties
    }
    return render(request, 'admin_manage/edit_product.html', context)

@csrf_exempt
def add_product(request):
    p = request.POST
    f = request.FILES
    if p and f:
        bind = p.get("bind")
        name = p.get("name")
        img = f.get("img")
        new_product = Product.objects.create(bind_id=bind, name=name, img=img)
        if p.get("column") is not None and p.get("value") is not None:
            columns = p.getlist("column")
            values = p.getlist("value")
            for c, v in zip(columns, values):
                ProductProperty.objects.create(bind_id=new_product.id, name=c, value=v)

    return JsonResponse({"status": 200})

def search(request):
    if request.GET:
        assignment = request.GET.get("assignment")
        if assignment is not None and assignment != "":
            v = assignment
            obj = Assignment.objects.select_related("bind").filter(Q(name__icontains=v)|Q(number__icontains=v)|Q(date__icontains=v))
            data = ""
            for i in obj:
                svg = ""
                if i.done == True:
                    svg = f"""
                            <td class="td_action">
                                <div style="padding:10px; cursor:pointer;" onclick="done(this)" done="true" data-id="{i.id}">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="10" cy="10" r="9.5" stroke="#8DEB27"/>
                                        <path d="M8.22395 11.7111L8.5775 12.0646L8.93105 11.7111L14.0711 6.57105C14.1658 6.47632 14.3292 6.47632 14.4239 6.57105C14.5187 6.66579 14.5187 6.82921 14.4239 6.92395L8.75395 12.5939C8.70664 12.6412 8.64339 12.6675 8.5775 12.6675C8.51162 12.6675 8.44836 12.6412 8.40105 12.5939L5.57105 9.76395C5.47632 9.66921 5.47632 9.50579 5.57105 9.41105C5.66579 9.31632 5.82921 9.31632 5.92395 9.41105L8.22395 11.7111Z" fill="white" stroke="#8DEB27"/>
                                    </svg>
                                </div>
                            </td>
                        """
                elif i.done == False:
                    svg = f"""
                            <td class="td_action">
                                <div style="padding:10px; cursor:pointer;" onclick="done(this)" done="false" data-id="{i.id}">
                                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="10" cy="10" r="9.5" stroke="#FFCC01"/>
                                        <path d="M13.82 14.17C13.69 14.17 13.56 14.14 13.44 14.06L10.34 12.21C9.57 11.75 9 10.74 9 9.85V5.75C9 5.34 9.34 5 9.75 5C10.16 5 10.5 5.34 10.5 5.75V9.85C10.5 10.21 10.8 10.74 11.11 10.92L14.21 12.77C14.57 12.98 14.68 13.44 14.47 13.8C14.32 14.04 14.07 14.17 13.82 14.17Z" fill="#FFCC01"/>
                                    </svg>
                                </div>
                            </td>
                        """

                data += f"""
                             <tr>
                                <td class="td_name">{i.name}</td>
                                <td class="td_date">{i.date}</td>
                                <td class="td_number">
                                    <a href="tel:{i.number}">+{i.number}</a>
                                </td>
                                <td class="td_category">{i.bind.short}</td>
                                <td class="td_comment">
                                    <p onclick="more_comment(this)">
                                        {i.message}
                                    </p>
                                </td>
                                {svg}
                            </tr>
                         """
            return HttpResponse(data)

        category2 = request.GET.get("category2")
        if category2 is not None:
            value = request.GET.get('value')
            if value != "":
                obj = ProductCategory2.objects.select_related("bind").filter(bind_id=category2).filter(name__icontains=value)
                data = ""
                for i in obj:
                    category3 = ProductCategory3.objects.select_related("bind").filter(bind_id=i.id)
                    cat3html = ""
                    for z in category3:
                        cat3html += f"""
                                       
                                            <li>
                                                <div class="edit_input edit_input_cat3">
                                                    <input type="text" value="{z.name}">
                                                </div>
                                                <div class="category_under_name">
                                                    <a href="?category3={z.id}">
                                                        {z.name}
                                                    </a>
                                                </div>
                                                <div class="category_under_action">
                                                    <a data-edit="{z.id}" data-action="edit" onclick="edit_category(this,'cat3')">
                                                        <i class="bi bi-pencil"></i>
                                                    </a>
                                                    <a onclick="delete_category(this,'cat3')" data-delete="{z.id}">
                                                        <i class="bi bi-trash"></i>
                                                    </a>
                                                </div>
                                            </li>
                                    """
                    data += f"""
                                <tr class="tr_category">
                                    <td class="td_product">
                                        <div class="edit_input">
                                            <input type="text" value="{i.name}">
                                        </div>
                                        <p class="category_top" onclick="get_category(this)">
                                             {i.name} <i class="bi bi-chevron-down"></i>
                                        </p>
                                         <ul class="category_under">
                                            {cat3html}
                                         </ul>
                                     </td>
                                     <td class="td_product_actions">
                                        <div class="admin_add" data-add="{i.id}" data-action="add" onclick="add_category(this,'cat2')">
                                            <i class="bi bi-plus-circle"></i>
                                        </div>
                                        <div class="admin_edit" data-edit="{i.id}" data-action="edit" onclick="edit_category(this,'cat2')">
                                            <i class="bi bi-pencil"></i>
                                        </div>
                                        <div class="admin_delete" data-delete="{i.id}" onclick="delete_category(this,'cat2')">
                                            <i class="bi bi-trash"></i>
                                        </div>
                                     </td>
                                </tr>
                            """

                return HttpResponse(data)

        product = request.GET.get("category3")
        if product is not None:
            data = {}
            value_product = request.GET.get("value")
            if value_product != "":
                obj_product = Product.objects.select_related("bind").filter(bind_id=product).filter(name__icontains=value_product)
                data['response'] = serialize("json", obj_product)
                return JsonResponse(data)



