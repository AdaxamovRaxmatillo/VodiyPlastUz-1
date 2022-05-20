function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

function more_comment(e){
    if (e.style.maxHeight) {
      e.style.maxHeight = null;
    } else {
      e.style.maxHeight = e.scrollHeight + "px";
    }
}

function done(e){
    e.innerHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>'
    if(e.getAttribute("done") === 'false'){
        fetch(`?to_done=${e.getAttribute("data-id")}`)
        .then(response =>{
            return response.json();
        })
        .then(function(data){
            e.setAttribute("done",true)
            e.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="10" cy="10" r="9.5" stroke="#8DEB27"/><path d="M8.22395 11.7111L8.5775 12.0646L8.93105 11.7111L14.0711 6.57105C14.1658 6.47632 14.3292 6.47632 14.4239 6.57105C14.5187 6.66579 14.5187 6.82921 14.4239 6.92395L8.75395 12.5939C8.70664 12.6412 8.64339 12.6675 8.5775 12.6675C8.51162 12.6675 8.44836 12.6412 8.40105 12.5939L5.57105 9.76395C5.47632 9.66921 5.47632 9.50579 5.57105 9.41105C5.66579 9.31632 5.82921 9.31632 5.92395 9.41105L8.22395 11.7111Z" fill="white" stroke="#8DEB27"/></svg>'
        })
        .catch(function(err){
            console.log(err)
        })

    }
    else if(e.getAttribute('done') === 'true'){
        fetch(`?to_false=${e.getAttribute("data-id")}`)
        .then(response =>{
            return response.json();
        })
        .then(function(data){
            e.setAttribute("done",false)
            e.innerHTML = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9.5" stroke="#FFCC01"/><path d="M13.82 14.17C13.69 14.17 13.56 14.14 13.44 14.06L10.34 12.21C9.57 11.75 9 10.74 9 9.85V5.75C9 5.34 9.34 5 9.75 5C10.16 5 10.5 5.34 10.5 5.75V9.85C10.5 10.21 10.8 10.74 11.11 10.92L14.21 12.77C14.57 12.98 14.68 13.44 14.47 13.8C14.32 14.04 14.07 14.17 13.82 14.17Z" fill="#FFCC01"/></svg>'
        })
        .catch(function(err){
            console.log(err)
        })
    }
}

function get_category(e){
    let panel = e.nextElementSibling;
    if(panel.style.maxHeight){
      panel.style.maxHeight = null;
      e.style.color = 'white'
      document.querySelector(".url_category2").innerHTML = ""
    }else{
       document.querySelectorAll(".category_under").forEach(function(z,index){
        if(z.style.maxHeight){
            z.style.maxHeight = null;
            document.querySelectorAll(".category_top")[index].style.color = "white"
        }
    })
      panel.style.maxHeight = panel.scrollHeight + "px";
      e.style.color = '#FFCC01'
      let cat2_url = e.textContent.trim();
      if(cat2_url.length >= 20){
        document.querySelector(".url_category2").innerHTML = e.textContent.trim().slice(0,20) + '...'
      }
      else{
        document.querySelector(".url_category2").innerHTML = e.textContent.trim()
      }
    }
}

function delete_category(e,w){
    e.parentElement.parentElement.style.display = "none"
    if(w === 'cat2'){
        fetch(`?delete_category2=${e.getAttribute("data-delete")}`)
    }
    else if(w === 'cat3'){
        fetch(`?delete_category3=${e.getAttribute("data-delete")}`)
    }
    else if(w === 'pr'){
        fetch(`?delete_pr=${e.getAttribute("data-delete")}`)
    }
}

function edit_category(e,w){
    let action = e.getAttribute("data-action");
    let data_edit = e.getAttribute("data-edit");
    let input = e.parentElement.parentElement.querySelector(".edit_input");
    let text;
    if(w === 'cat2'){
       text = e.parentElement.parentElement.querySelector(".category_top");
    }
    else if(w === 'cat3'){
        text = e.parentElement.parentElement.querySelector(".category_under_name");
    }
    if(action === "edit"){
        e.setAttribute("data-action", "save")
        e.innerHTML = '<i class="bi bi-check2-all"></i>'
        text.style.display = "none";
        input.style.display = "block";
        input.querySelector("input").value = text.textContent.trim();
    }
    else if(action === "save"){
        e.setAttribute("data-action", "edit")
        e.innerHTML = '<i class="bi bi-pencil"></i>'
        text.style.display = "block";
        input.style.display = "none";
        if(input.querySelector("input").value.trim().toLowerCase() !== text.textContent.trim().toLowerCase()){
            if(input.querySelector("input").value != ""){
                if(w === 'cat2'){
                fetch(`?edit_category2=${data_edit}&val2=${input.querySelector("input").value}`)
                text.innerHTML = input.querySelector("input").value + ' <i class="bi bi-chevron-down"></i>'
                }
                else if(w === 'cat3'){
                    fetch(`?edit_category3=${data_edit}&val3=${input.querySelector("input").value}`)
                    text.querySelector("a").innerHTML = input.querySelector("input").value;
                }
            }
        }
    }
}

function add_category(e,w){
    let action = e.getAttribute("data-action");
    let data_add = e.getAttribute("data-add");
    let input = e.parentElement.parentElement.querySelector(".edit_input");
    let text;
    let ul = e.parentElement.parentElement.querySelector(".category_under");
    if(w === 'cat2'){
       text = e.parentElement.parentElement.querySelector(".category_top");
    }
    if(action === "add"){
        e.setAttribute("data-action", "save")
        e.innerHTML = '<i class="bi bi-check2-all"></i>'
        text.style.display = "none";
        input.style.display = "block";
        input.querySelector("input").value = ""
        input.querySelector("input").setAttribute("placeholder","+Добавить категорию")

    }
    else if(action === "save"){
        e.setAttribute("data-action", "add")
        e.innerHTML = '<i class="bi bi-plus-circle"></i>'
        text.style.display = "block";
        input.style.display = "none";
        if(input.querySelector("input").value != ""){
            if(w === 'cat2'){
               fetch(`?add_category2=${data_add}&val2=${input.querySelector("input").value}`)
               .then(response=>{
                    return response.json()
               })
               .then( function(data){
                    let input_value = input.querySelector('input').value
                    ul.innerHTML += `
                        <li>
                            <div class="edit_input edit_input_cat3">
                                <input type="text" value="${input_value}">
                            </div>
                            <div class="category_under_name">
                                <a href="?category3=${data.category_id}">
                                    ${input_value}
                                </a>
                            </div>
                            <div class="category_under_action">
                                <a data-edit="${data.category_id}" data-action="edit" onclick="edit_category(this,'cat3')">
                                    <i class="bi bi-pencil"></i>
                                </a>
                                <a onclick="delete_category(this,'cat3')" data-delete="${data.category_id}">
                                    <i class="bi bi-trash"></i>
                                </a>
                            </div>
                        </li>
                    `
               })
            }
        }
    }
}

function add_cat2(){
    let add = document.querySelector(".right_panel_add");
    add.style = "display:flex;"
    add.querySelector("input").value = ""
}

function save_cat2(){
   let add = document.querySelector(".right_panel_add");
   add.style = "display:none;";
   let value = add.querySelector("input").value;
   if(value != ""){
        fetch(`?add_category1=${value}`)
        .then(response=>{
            return response.json()
        })
        .then(function(data){
            document.querySelector("tbody").innerHTML += `
                    <tr class="tr_category">
                        <td class="td_product">
                            <div class="edit_input">
                                <input type="text" value="${value}">
                            </div>
                            <p class="category_top" onclick="get_category(this)">
                                 ${value} <i class="bi bi-chevron-down"></i>
                            </p>
                            <ul class="category_under">

                            </ul>
                         </td>
                         <td class="td_product_actions">
                            <div class="admin_add" data-add="${data.category_id}" data-action="add" onclick="add_category(this,'cat2')">
                                <i class="bi bi-plus-circle"></i>
                            </div>
                            <div class="admin_edit" data-edit="${data.category_id}" data-action="edit" onclick="edit_category(this,'cat2')">
                                <i class="bi bi-pencil"></i>
                            </div>
                            <div class="admin_delete" data-delete="${data.category_id}" onclick="delete_category(this,'cat2')">
                                <i class="bi bi-trash"></i>
                            </div>
                         </td>
                     </tr>
            `
        })
   }
}

function show(e){
    e.innerHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>'
    if(e.getAttribute("data-show") === 'false'){
        e.setAttribute("data-show",true)
        e.innerHTML = "<span></span>"
        e.querySelector("span").style.backgroundColor = "green"
        fetch(`?to_show=${e.getAttribute("data-id")}`)
    }
    else if(e.getAttribute('data-show') === 'true'){
        e.setAttribute("data-show",false)
        e.innerHTML = "<span></span>"
        e.querySelector("span").style.backgroundColor = "red";
        fetch(`?to_hidden=${e.getAttribute("data-id")}`)
    }
}


function edit_product(e,w){
    let action = e.getAttribute("data-action");
    let data_edit = e.getAttribute("data-edit");
    let par = e.parentElement.parentElement.querySelector(".properties");
    if(action === "edit"){
        e.setAttribute("data-action", "save")
        e.innerHTML = '<i class="bi bi-check2-all"></i>'
        if(w === 'product'){
            par.querySelectorAll("p")[0].style = "display:none;"
            par.querySelector("input").style = "display:block;"
        }
        else if(w === 'property'){
            par.querySelectorAll("input")[0].style = "display:block;"
            par.querySelectorAll("p")[0].style = "display:none;"
            par.querySelectorAll("input")[1].style = "display:block;"
            par.querySelectorAll("p")[1].style = "display:none;"
        }
    }
    else if(action === "save"){
        e.setAttribute("data-action", "edit")
        e.innerHTML = '<i class="bi bi-pencil"></i>'
        if(w === 'product'){
            par.querySelectorAll("p")[0].style = "display:block;"
            par.querySelector("input").style = "display:none;"
            if(par.querySelector("input").value.trim().toLowerCase() !== par.querySelectorAll("p")[0].textContent.trim().toLowerCase()){
                if(par.querySelector("input").value !== ""){
                    fetch(`?editproduct=${data_edit}&val=${par.querySelector("input").value}`)
                    par.querySelectorAll("p")[0].textContent = par.querySelector("input").value;
                }
            }
        }
         else if(w === 'property'){
            par.querySelectorAll("input")[0].style = "display:none;"
            par.querySelectorAll("p")[0].style = "display:block;"
            par.querySelectorAll("input")[1].style = "display:none;"
            par.querySelectorAll("p")[1].style = "display:block;"
            if(par.querySelectorAll("input")[0].value.trim().toLowerCase() !== par.querySelectorAll("p")[0].textContent.trim().toLowerCase() || par.querySelectorAll("input")[1].value.trim().toLowerCase() !== par.querySelectorAll("p")[1].textContent.trim().toLowerCase()){
                if(par.querySelectorAll("input")[0].value !== "" && par.querySelectorAll("input")[1].value !== ""){
                    fetch(`?editproperties=${data_edit}&name=${par.querySelectorAll("input")[0].value}&value=${par.querySelectorAll("input")[1].value}`)
                    par.querySelectorAll("p")[0].textContent = par.querySelectorAll("input")[0].value;
                    par.querySelectorAll("p")[1].textContent = par.querySelectorAll("input")[1].value;
                }
            }
        }
    }
}

function edit_product_image(){
     let file = document.querySelector("#upload_product_image").files[0];
     document.querySelector(".product_image").querySelector("img").src = window.URL.createObjectURL(file)
     let fd = new FormData();
     fd.append('data',document.querySelector("#upload_product_image").files[0]);
     fetch('',{
     method:"POST",
     body:fd
     })
}

function add_column(){
    let product = document.createElement("div");
    product.className = "new_product_inputs properties_repeat"
    product.innerHTML = `<div class="product_inputs">
                            <p style="margin-bottom:10px;">столбец значений</p>
                                 <input type="text">
                            </div>
                            <div class="product_inputs">
                                <p style="margin-bottom:10px;">ценность</p>
                            <div>
                                <input type="text">
                                <a onclick="delete_column(this)">
                                    <i class="bi bi-trash"></i>
                                </a>
                            </div>
                        </div>`
    document.querySelector(".new_product_properties").appendChild(product)
}

function delete_column(e){
     e.parentElement.parentElement.parentElement.remove()
}

function new_product_img(){
    let file = document.querySelector("#new_product_img_upload").files[0];
    document.querySelector(".new_product_img_uploaded").src = window.URL.createObjectURL(file)
    document.querySelector(".new_img_preview").querySelector("label").style.display = "none"
    document.querySelector(".new_img_preview").querySelector("img").style.display = "block"
    let pr_img = document.querySelector(".new_product_img_uploaded");
    let save = document.querySelector(".save_product");
    let pr_name = document.querySelector(".new_product_name").querySelector("input");
    if(pr_img.getAttribute("src") !== "" && pr_name.value !== ""){
        save.style = "opacity:1;"
        save.removeAttribute("disabled");
    }
    else{
        save.style = "opacity:0.5;"
        save.setAttribute("disabled","none");
    }
}

function delete_product(e){
    document.querySelector(".single_product").remove()
    fetch(`?delete_product_single=${e.getAttribute("data-del")}`)
    window.location = "/manage/product/1/"
}

function create_product(e,el){
    let pr_img = document.querySelector("#new_product_img_upload");
    let pr_file = document.querySelector("#file");
    let pr_name = document.querySelector(".new_product_name").querySelector("input");
    let form = new FormData();
    form.append("img", pr_img.files[0])
    form.append("name", pr_name.value)
    form.append("bind", e)
    let properties = document.querySelectorAll(".properties_repeat");
    properties.forEach(function(e){
        let inputs = e.querySelectorAll("input");
        if(inputs[0].value !== "" && inputs[1].value !== ""){
            let column_name = e.querySelectorAll("input")[0]
            let column_value = e.querySelectorAll("input")[1]
            form.append('column', column_name.value)
            form.append('value', column_value.value)
        }
    })
    fetch('/manage/product/addproduct/',{
        method: 'POST',
        body:form
    })
    .then(response=>{
        return response.json()
    })
    .then(
        function(data){
        alert("успешно добавлен")
        location.reload()
    })
    .catch(function(err){
        console.log(err)
    })
}



function check_input(e){
    let pr_img = document.querySelector(".new_product_img_uploaded");
    let save = document.querySelector(".save_product");
    if(pr_img.getAttribute("src") !== "" && e.value !== ""){
        save.style = "opacity:1;"
        save.removeAttribute("disabled");
    }
    else{
        save.style = "opacity:0.5;"
        save.setAttribute("disabled","none");
    }
}


function search(el,to){
    let value = el.value;
    if(to === 'assignment'){
        if(value !== ""){
            fetch(`/manage/search/?assignment=${value}`)
            .then( response=>{
                return response.text()
            })
            .then( function(data){
                document.querySelector(".assignment_table").innerHTML = data
            })
        }
    }
    else if(isNumber(to)){
            if(value !== ""){
                fetch(`/manage/search/?category2=${to}&value=${value}`)
                .then( response=>{
                    return response.text();
                })
                .then( function(data){
                    document.querySelector(".category2_tabel").innerHTML = data
                })
            }
    }
    else if(to.startsWith("product")){
        let id = to.replace("product",'')
        if(value !== ""){
            fetch(`/manage/search/?category3=${id}&value=${value}`)
            .then( response=>{
                    return response.json();
                })
            .then( function(data){
                let result = JSON.parse(data.response);
                let product_html = "";
                let show = ""
                result.forEach((e)=>{
                    if(e.fields.show === true){
                        show = `
                             <div class="admin_edit admin_show" data-id="${e.pk}" data-show="true" onclick="show(this)">
                                <span style="background-color:green;"></span>
                             </div>
                                `
                    }
                    else if(e.fields.show === false){
                        show = `
                             <div class="admin_edit admin_show" data-id="${e.pk}" data-show="false" onclick="show(this)">
                                <span></span>
                             </div>
                                `
                    }
                    product_html += `
                                        <tr class="tr_category">
                                            <td class="td_product">
                                                <p class="category_top">
                                                    <a href="/manage/editproduct/${e.pk}/">
                                                        ${e.fields.name}
                                                    </a>
                                                </p>
                                             </td>
                                             <td class="td_product_actions">
                                                ${show}
                                                 <a href="/manage/editproduct/${e.pk}/">
                                                     <div class="admin_edit" >
                                                        <i class="bi bi-pencil"></i>
                                                     </div>
                                                 </a>
                                                 <div class="admin_delete" onclick="delete_category(this,'pr')" data-delete="${e.pk}">
                                                    <i class="bi bi-trash"></i>
                                                 </div>
                                             </td>
                                         </tr>
                                    `
                })
                document.querySelector(".table_product_result").innerHTML = product_html
            })
        }
    }

}

function edit_post_text(e){
    let action = e.getAttribute("data-action");
    let data_id = e.getAttribute("data-id");
    let parent = e.parentElement;
    if(action === "edit"){
        e.setAttribute("data-action", "save");
        e.innerHTML = '<i class="bi bi-check2-all"></i>'
        parent.querySelector("p").style.display = "none"
        parent.querySelector("textarea").style.display = "block"
    }
    else if(action === "save"){
        e.setAttribute("data-action", "edit");
        e.innerHTML = '<i class="bi bi-pencil"></i>'
        let p = parent.querySelector("p");
        let text = parent.querySelector("textarea");
        p.style.display = "block"
        text.style.display = "none"
        if(p.textContent.trim().toLowerCase() !== text.value.trim().toLowerCase()){
            if(text.value !== ""){
                fetch(`
                    ?text_id=${data_id}&text=${text.value}
                `)
                p.textContent = text.value.trim()
            }
        }
    }
}

function edit_post_img(e){
    let data_id = e.getAttribute("data-id");
    let parent = e.parentElement;
    let file = e.files[0];
    parent.querySelector("a").querySelector("img").src = window.URL.createObjectURL(file)
    let form = new FormData();
    form.append("img_id", data_id)
    form.append("change_img", file);
    fetch(``,{
        method: "POST",
        body: form,
    })
}
