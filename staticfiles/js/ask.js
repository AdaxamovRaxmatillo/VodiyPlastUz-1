document.getElementById("form").addEventListener('submit', e=>{
    e.preventDefault();
    let name = document.querySelector(".ask_input_name").value;
    let number = document.querySelector(".ask_input_number").value;
    let city = document.querySelector(".ask_input_select_city").value;
    let email = document.querySelector(".ask_input_email").value;
    let category = document.querySelector(".ask_input_select_cat").value;
    let message = document.querySelector(".ask_input_mess").value;
    let val = document.getElementById("form").querySelector(".ask_input").value;
    let status = document.querySelector(".status");
    var http = new XMLHttpRequest();
    http.open('POST', '', true)
    http.onreadystatechange = function(){
        if (http.readyState === 4 && http.status === 200) {
            let response = JSON.parse(this.response);
            if(response.status === 404){
                document.querySelector(".waiter").style.display = "none"
                document.querySelector(".verification_img").src = `/static/images/ask/shuffle_${response.img_id}.png`
            }
            else if(response.status === 200){
                document.querySelector(".ask_alert").style = "transform:translateY(0);"
                if(response.assignment === 200){
                    document.querySelector(".waiter").style.display = "none"
                    status.style = "color:green;"
                    status.innerHTML = '<i class="bi bi-check2"></i><br>Успех'
                    document.querySelector(".status_text").innerHTML = "Мы свяжемся с вами"
                    document.querySelector(".ask_input_name").value = ""
                    document.querySelector(".ask_input_number").value = ""
                    document.querySelector(".ask_input_select_city").value = ""
                    document.querySelector(".ask_input_email").value = ""
                    document.querySelector(".ask_input_select_cat").value = ""
                    document.querySelector(".ask_input_mess").value = ""
                    document.getElementById("form").querySelector(".ask_input").value = ""
                    setTimeout(function(){
                        window.location = location.origin
                    },3000)
                }
                else if(response.assignment === 404){
                    document.querySelector(".waiter").style.display = "none"
                    status.style = "color:red;"
                    status.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i><br>этот номер был введен ранее'
                    document.querySelector(".status_text").innerHTML = "мы свяжемся с вами, прежде чем вы войдете"
                }
            }
        }
    }
    document.querySelector(".waiter").style.display = "flex"
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    http.send(`name=${name}&number=${number}&city=${city}&email=${email}&category=${category}&message=${message}&verification=${val}`)
})


function hidden_alert(e){
    e.style = "transform:translateY(-100%);"
}
