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

let category1 = document.querySelectorAll(".categories_dcm_block")[0];
category1.classList.add("checked_catalog");

function getfile(id){
   fetch(`${window.location.origin}/documents?id=${id}`)
   .then( response =>{
   return response.text()
   })
   .then( function(data){
   document.querySelector(".loader").style.display = "none"
   document.querySelector(".dcm_main_container").innerHTML = data;
   return data
   })
   .catch( function(err){
    return err
   })
}

getfile(category1.getAttribute("data"))

function checked(e){
    document.querySelector(".dcm_main_container").innerHTML = ""
    document.querySelector(".loader").style.display = "flex"
    getfile(e.getAttribute("data"))
    document.querySelector(".checked_catalog").className = "categories_dcm_block"
    if(e.className == "categories_dcm_block"){
        e.classList = "categories_dcm_block checked_catalog";
    }
}


