/* START NAVBAR CONTROLR */
document.querySelector(".navbar_section").classList = "navbar_section navbar_section_dcm"
let navnum = 0;
function controlnavbar(){
   navnum++
   function media1(x) {
      var navbar = document.querySelector('.navbar_right_items');
      if (x.matches) { 
            if(navnum >= 2){navnum = 0}
            if (navnum == 0) {
                  navbar.style.height = 0;
                  navbar.style.borderBottom = ""
                 
            }
            if(navnum == 1){
                  var wrapper = navbar.querySelector("ul")
                  navbar.style.height = wrapper.clientHeight + "px";
                  navbar.style.borderBottom = "1px solid white"
             }
      } 
      else {
          navnum = 0
          navbar.style.height = "";
          navbar.style.borderBottom = ""
      }
  }
  var x = window.matchMedia("(max-width: 768px)")
  media1(x) 
  x.addListener(media1)
}
/* END NAVBAR CONTROLR */
document.querySelector(".checked_categories").querySelectorAll("p")[1].classList = "rotater checked_categories_rotate";
document.querySelector(".checked_categories").nextElementSibling.classList.add("categories_height")

function checked(e){
    history.pushState({}, null, `/categories/?ct1id=${e.getAttribute("data-id")}`);
    document.querySelectorAll(".getct3").forEach(function(y){
        y.style = ""
    })
    document.querySelectorAll(".category1_in_categories").forEach((e)=>{
    e.className = "category1_in_categories"
    })

    if(e.classList == "categories_dcm_block categories_page"){
        document.querySelector(".category2_in_categories_block").innerHTML = '<div class="loader" style="display:flex;"> <div class="lds-roller"> <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>'
        document.querySelectorAll(".categories_page").forEach((z)=>{
            z.className = "categories_dcm_block categories_page"
        });
         document.querySelectorAll(".category1_in_categories").forEach((y)=>{
            y.style.maxHeight = null;
        });
        document.querySelectorAll(".rotater").forEach((r)=>{
            r.className = "";
        })
        let panel = e.nextElementSibling;
        e.classList = "categories_dcm_block categories_page checked_categories";
        panel.style.maxHeight = panel.scrollHeight + "px";

        if(document.querySelector(".right_documents_title_mobile") || document.querySelector(".right_documents_title")){
           document.querySelector(".right_documents_title_mobile").textContent = e.querySelector('p').textContent
           document.querySelector(".right_documents_title").textContent = e.querySelector('p').textContent
        }
        
        document.querySelector(".checked_categories").querySelectorAll("p")[1].classList = "rotater checked_categories_rotate";
        /**/
    let firstchild = e.nextElementSibling.querySelector("ul").querySelectorAll("li")[0].querySelector("a");
    firstchild.style = "color:white !important;"
    fetch(`getcategory3${firstchild.getAttribute("href")}`)
    .then(response=>{
        return response.text()
    })
    .then(function(data){
        document.querySelector(".category2_in_categories_block").innerHTML = data
    })
    .catch(function(err){
         console.log(err)
    })
    /**/
    }
    else{
        e.className = "categories_dcm_block categories_page"
        e.nextElementSibling.style.maxHeight = null;
        document.querySelectorAll(".categories_page").forEach((e)=>{
        e.querySelectorAll("p")[1].className = "";
        })
    }
}

let categories = document.querySelectorAll(".category2_in_categories")

if(categories.length >= 2){
 categories[categories.length-2].style = "border-bottom:1px solid rgba(255,255,255,0.5);"   
}

document.querySelectorAll(".getct3").forEach(function(e){
    e.addEventListener("click", z=>{
        document.querySelector(".category2_in_categories_block").innerHTML = '<div class="loader" style="display:flex;"> <div class="lds-roller"> <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>'
        document.querySelectorAll(".getct3").forEach(function(y){
            y.style = ""
        })
        z.preventDefault();
        e.style = "color:white !important;"
        let data = e.getAttribute("href");
//        history.pushState({}, null, `${data}`);
        fetch(`/categories/getcategory3/${data}`)
        .then(response=>{
            return response.text()
        })
        .then(function(data){
            document.querySelector(".category2_in_categories_block").innerHTML = data
        })
        .catch(function(err){
             console.log(err)
        })
    })
})

/* get product */
//function getproduct(e){
//        document.querySelector(".category2_in_categories_block").innerHTML = '<div class="loader" style="display:flex;"> <div class="lds-roller"> <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>'
//        let api    = e.getAttribute("data-url");
//        fetch('get_product' + api)
//        .then(response=>{
//            return response.text();
//        })
//        .then(function(data){
//            document.querySelector(".category2_in_categories_block").innerHTML = data
//        })
//        .catch(function(err){
//            console.log(err)
//        })
//}