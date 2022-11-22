'use strict';

let count = 1;

document.getElementById('radio1').checked = true;

setInterval(function(){
    nextImage()
}, 3000)

function nextImage(){
    count++
    if(count>4){
        count = 1
    }
    document.getElementById("radio" + count).checked = true;
}

var searchMobile = document.getElementById("search-mobile")
var btnMobile = document.getElementById("btnMobile")

btnMobile.addEventListener("click", function(){
    if (searchMobile.style.visibility === "visible"){
        searchMobile.style.visibility = "hidden"
    } else{
        searchMobile.style.visibility = "visible"
    }
})