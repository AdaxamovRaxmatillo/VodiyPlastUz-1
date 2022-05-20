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
    "stroke": '#fff',
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


let under_carts = document.querySelectorAll(".category_under_img_block");
let under_cart_texts = document.querySelectorAll(".category_under_img_text")
window.addEventListener("scroll",function(){
/* START SCROLLING */
let wheight = window.innerHeight;
/*counters*/
let get_p = document.querySelectorAll(".pg2_big_counter");
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
                },100)
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

/* start main swiper 2*/

var main_swiper2 = new Swiper(".pg2_swiper2",{
    effect:"fade",
    autoplay: {
          delay:3000,
          disableOnInteraction: false,
    }

})
var inswiper_img = new Swiper(".inswiper_img")

let mainsw2num = 0;

let sw2len = document.querySelectorAll(".pg2_slides2_imgs").length;

var main_text_swiper = new Swiper(".pg2_swiper2_texts")

var main_text_swiper_mobile = new Swiper(".pg2_swiper2_texts_mobile")

main_swiper2.on('slideChangeTransitionEnd', function() {
  main_text_swiper.slideTo(this.realIndex)
  main_text_swiper_mobile.slideTo(this.realIndex)
  inswiper_img.slideTo(this.realIndex)
  mainsw2num = this.realIndex;
});

main_text_swiper.on("slideChangeTransitionEnd",function(){
  main_swiper2.slideTo(this.realIndex)
})

main_text_swiper_mobile.on("slideChangeTransitionEnd",function(){
  main_swiper2.slideTo(this.realIndex)
})

inswiper_img.on("slideChangeTransitionEnd",function(){
  main_swiper2.slideTo(this.realIndex)
})

function toRight(){

    mainsw2num++;
    if(mainsw2num >= sw2len){
        mainsw2num = 0;
    }
    main_swiper2.slideTo(mainsw2num)
}

function toLeft(){

    mainsw2num--;
    if(mainsw2num <= -1){
        mainsw2num = sw2len-1;
    }
    main_swiper2.slideTo(mainsw2num)
}

/* end main swiper 2 */