/* START BANNER  */
var bannerswiper = new Swiper(".banner_swiper", {
    slideToClickedSlide: false,
    effect: "fade",
    loop:true,
    autoplay: {
          delay:3000,
          disableOnInteraction: false,
    },

});


let banner_len = document.querySelectorAll(".banner_swiper_slides").length-2;

let banner_len_percent = 100/banner_len;

let swnum = 1;
document.querySelector(".progress_1").setAttribute("data-value",banner_len_percent)

let counter_small = document.querySelector(".counter_number_small");
let counter_mobile = document.querySelector(".swiper_mobile_counter");
    
counter_mobile.innerHTML = `<p>1/${banner_len}</p>`
counter_small.innerHTML = `<p>1/${banner_len}</p>`

function swipercontrol(){
    swnum++
    if(swnum >= banner_len+1){swnum = 1}
    bannerswiper.slideTo(swnum)
    
}

function swipercontroldecriment(){
    swnum--
    if(swnum <= 0){swnum = banner_len}
    bannerswiper.slideTo(swnum)
}

 var bar1 = new ldBar(".progress_1",{
     "stroke": '#fff',
     "stroke-width": 1,
 });

 document.querySelector(".progress_1").ldBar

bannerswiper.on('slideChangeTransitionEnd', function() {
    let index_currentSlide = bannerswiper.realIndex;
    bar1.set(banner_len_percent * (index_currentSlide+1))
    let counter = document.querySelector(".counter_number");
    let counter_small = document.querySelector(".counter_number_small");
    let counter_mobile = document.querySelector(".swiper_mobile_counter");
    counter.innerHTML = `<span>${index_currentSlide+1}</span>`

    counter_mobile.innerHTML = `<p>${index_currentSlide+1}/${banner_len}</p>`
    counter_small.innerHTML = `<p>${index_currentSlide+1}/${banner_len}</p>`

  });


/* END BANNER  */

/* START SCROLL ANIMATIONS */

let under_carts = document.querySelectorAll(".category_under_img_block");
let under_cart_texts = document.querySelectorAll(".category_under_img_text")
window.addEventListener("scroll",function(){
/* START SCROLLING */
    let wheight = window.innerHeight;
    let scroll = window.scrollY
    under_carts.forEach(function(e,index){
        let position = e.getBoundingClientRect();
        let num = 0
        if(window.innerWidth <= 992){
          num = 150  
        }else{
          num = 250
        }
        if(position.top <= wheight - num){
            e.classList = "category_under_img_block for_category_under"
            under_cart_texts[index].classList = "category_under_img_text for_category_under_text"
            }
        else{
            e.classList = "category_under_img_block"
             under_cart_texts[index].classList = "category_under_img_text"
        }
    })

    /*counters*/
    let get_p = document.querySelectorAll(".mcounter");
    get_p.forEach((e)=>{

        let c_position = e.getBoundingClientRect();

        if(c_position.top <= wheight - 200){   
            let e_inner = Number(e.innerHTML);
            if(e_inner < 1){
                let e_data = Number(e.getAttribute("data"));
                
                if(e_data <= 100){
                    let i = 0;
                    let int = setInterval(function(){
                        i++
                        e.innerHTML = i;
                        if(i >= e_data ){
                            clearInterval(int)
                        }
                    },800)
                }
                else if(e_data <= 1500){
                    let i = 0;
                        let int = setInterval(function(){
                        i+=5
                        e.innerHTML = i;
                        if(i >= e_data ){
                            clearInterval(int)
                        }
                        },10)
                }
                else{
                    let i = 0;
                    let int = setInterval(function(){
                    i+=200
                    e.innerHTML = i;
                    if(i >= e_data ){
                        clearInterval(int)
                    }
                    },10)
                }
            }

        }

    })
/* END SCROLLING */

})

/* END SCROLL ANIMATIONS */

var mainswiper1 = new Swiper(".main_swiper_img",{
    effect:"fade",
    autoplay: {
          delay:3000,
          disableOnInteraction: false,
    },

})

var maintextwiper = new Swiper(".text_swiper",{
    spaceBetween:10,
})

let main_swiper_len = document.querySelectorAll(".clen").length;
let main_swiper_len_percent = 100/main_swiper_len
let main_bar = document.querySelector(".progress_2");
main_bar.setAttribute("data-value",main_swiper_len_percent)

document.querySelector(".main_counter_number_small").innerHTML = `1/${main_swiper_len}`

document.querySelector(".main_mobile_counter").innerHTML = `1/${main_swiper_len}`

var bar2 = new ldBar(".progress_2",{
    "stroke": '#000',
    "stroke-width": 1,
})

let msnum = 0;

function change_main_carousel(){
    msnum++
    if(msnum >= main_swiper_len){msnum = 0}
    mainswiper1.slideTo(msnum)
}

function change_main_decriment(){
    msnum--
    if(msnum <= -1){msnum = main_swiper_len-1}
    mainswiper1.slideTo(msnum)

}



mainswiper1.on('slideChangeTransitionEnd', function() {
  let index_currentSlide = mainswiper1.realIndex;
  maintextwiper.slideTo(index_currentSlide);
  document.querySelector(".main_swiper_counter").innerHTML = `<span>${index_currentSlide+1}</span>`
  document.querySelector(".main_counter_number_small").innerHTML = `${index_currentSlide+1}/${main_swiper_len}`
  document.querySelector(".main_mobile_counter").innerHTML = `${index_currentSlide+1}/${main_swiper_len}`
  bar2.set(main_swiper_len_percent * (index_currentSlide+1))
});

maintextwiper.on('slideChangeTransitionEnd', function() {
  let index_currentSlide = maintextwiper.realIndex;
  mainswiper1.slideTo(index_currentSlide);
});


/* START NAVBAR CONTROLR */

let navnum = 0;
function controlnavbar(){
   navnum++
   function media1(x) {
      var navbar = document.querySelector('.navbar_right_items');
      let curtain = document.querySelector(".curtain_navbar");
      if (x.matches) { 
            if(navnum >= 2){navnum = 0}
            if (navnum == 0) {
                  navbar.style.height = 0;
                  navbar.style.borderBottom = ""
                  setTimeout(function(){
                    curtain.style = "display:none;"
                  },400)
            }
            if(navnum == 1){
                  var wrapper = navbar.querySelector("ul")
                  navbar.style.height = wrapper.clientHeight + "px";
                  navbar.style.borderBottom = "1px solid white"
                  curtain.style = "display:block;"
             }
      } 
      else {
          navnum = 0
          navbar.style.height = "";
          navbar.style.borderBottom = ""
          curtain.style = "display:none;"

      }
  }
  var x = window.matchMedia("(max-width: 768px)")
  media1(x) 
  x.addListener(media1)
}



/* END NAVBAR CONTROLR */


var mainswiper2 = new Swiper(".main_swiper_img2",{
    effect:"fade",
    autoplay: {
          delay:3000,
          disableOnInteraction: false,
    },

})

var maintextwiper2 = new Swiper(".text_swiper2",{
    spaceBetween:10,
})


var bar3 = new ldBar(".progress_3",{
 "stroke": '#000',
 "stroke-width": 1,
});

let flen = document.querySelectorAll(".flen").length;

let fpercent = 100/flen;

document.querySelector(".progress_3").ldBar

bar3.set(fpercent)

let fswnum = 1;

function fswipercontrol(){
    fswnum++
    if(fswnum >= flen){fswnum = 0}
    mainswiper2.slideTo(fswnum)
    
}
function fswipercontrol_secriment(){
    fswnum--
    if(fswnum <= 0){fswnum = flen-1}
    mainswiper2.slideTo(fswnum)
    
}

document.querySelector(".fcounter").innerHTML = `1/${flen}`

document.querySelector(".fmain_mobile_counter").innerHTML =  `1/${flen}`

mainswiper2.on('slideChangeTransitionEnd', function() {
  let index_currentSlide = mainswiper2.realIndex;
  maintextwiper2.slideTo(index_currentSlide);
  bar3.set(fpercent * (index_currentSlide+1));
  let fcounter = document.querySelector(".fcounter");
  fcounter.innerHTML = `${index_currentSlide+1}/${flen}`
  document.querySelector(".fcounter_big").innerHTML =  `<span>${index_currentSlide+1}</span>`
  document.querySelector(".fmain_mobile_counter").innerHTML =  `${index_currentSlide+1}/${flen}`
});

maintextwiper2.on('slideChangeTransitionEnd', function() {
  let index_currentSlide = maintextwiper2.realIndex;
  mainswiper2.slideTo(index_currentSlide);
});


function checked_category(e){
      document.querySelectorAll(".category_frames_items").forEach(function(z){
        z.className = "category_frames_items"
        z.querySelector(".category_checked").style = "display:none;"
      })
      if(e.className == "category_frames_items"){
        e.classList = "category_frames_items checked_category"
        e.querySelector(".category_checked").style = "display:inherit;"
      }
      else if(e.classList == "category_frames_items checked_category"){
        e.className = "category_frames_items"
        e.querySelector(".category_checked").style = "display:none;"
      }
}

document.querySelectorAll(".category_under").forEach(function(e){
    e.addEventListener("click",function(){
        window.location.href = e.getAttribute("data-url")
    })
})

let form = document.querySelector(".form");

form.addEventListener("submit", e=>{
    e.preventDefault();
    let name = document.getElementById("name").value;
    let number = document.getElementById("num").value;
    let message = document.getElementById("message").value;
    let bind = document.querySelector(".checked_category");
    let city = document.querySelector(".city").value;
    let status = document.querySelector(".status");
    if(typeof(bind) != 'undefined' && bind != null){
        var http = new XMLHttpRequest();
        http.open('POST', '', true)
        http.onreadystatechange = function(){
            if (http.readyState === 4 && http.status === 200) {
                document.querySelector(".ask_alert").style = "transform:translateY(0);"
                let response = JSON.parse(this.response)
                if(response.status == 200){
                    bind.className = "category_frames_items"
                    bind.querySelector(".category_checked").style = "display:none;"
                    document.getElementById("name").value = ""
                    document.getElementById("num").value = ""
                    document.getElementById("message").value = ""
                    status.style = "color:green;"
                    status.innerHTML = '<i class="bi bi-check2"></i><br>Успех'
                    document.querySelector(".status_text").innerHTML = "Мы свяжемся с вами"
                    history.replaceState(null, null, ' ');
                    document.querySelector(".not_selected_text").style.display = "none";
                    document.querySelector(".waiter").style.display = "none"
                }
                else{
                    status.style = "color:red;"
                    status.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i><br>этот номер был введен ранее'
                    document.querySelector(".status_text").innerHTML = "мы свяжемся с вами, прежде чем вы войдете"
                    document.querySelector(".waiter").style.display = "none"
                }
            }
        }
        document.querySelector(".waiter").style.display = "flex"
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        http.send(`name=${name}&number=${number}&city=${city}&message=${message}&bind=${bind.getAttribute("data-category")}`)
    }
    else{
        document.querySelector(".not_selected_text").style.display = "block"
        location.hash = '#category_form'
    }
})

function hidden_alert(e){
    e.style = "transform:translateY(-100%);"
}
