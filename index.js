import footer from "./footer.js";
import nav from "./navbar.js";




let navDiv = document.getElementById("nav");
let footerDiv = document.getElementById("footer");
navDiv.innerHTML = nav;
footerDiv.innerHTML = footer;
let searchForm = (localStorage.getItem("search-form"))||null;
let search = document.querySelector("#form-search")
let form = document.querySelector("#search-form");

form.addEventListener("submit",(e)=>{
   e.preventDefault()

   formSubmit(e)
});

function formSubmit(e){
   let x = search.value;
   console.log(x);
   localStorage.setItem("search-form",x);
   
   window.location.href = "products.html";


}





function first(){
    document.querySelector(".slide>img").src="https://www.bigbasket.com/media/uploads/banner_images/hp_m_FMCG-PL_TastiesOrigins_460px-250123.jpg"
 }
 function second(){
    document.querySelector(".slide>img").src="https://www.bigbasket.com/media/uploads/banner_images/hp_m_bcd_paneer_460px-020122.jpg"
 }
 function third(){
    document.querySelector(".slide>img").src="	https://www.bigbasket.com/media/uploads/banner_images/hp_m_FMCG-PL_iDFreshoStore_460px-250123.jpg"
 }
 setInterval(first,2000);
 setInterval(second,4000);
 setInterval(third,6000);
 
 


 function Mfirst(){
   document.querySelector(".Mslide>img").src="https://www.bigbasket.com/media/uploads/banner_images/hp_bcd_m_bcd_250123_400.jpg"
}
function Msecond(){
   document.querySelector(".Mslide>img").src="https://www.bigbasket.com/media/uploads/banner_images/hp_m_health_suppliment_250123_400.jpg"
}
function Mthird(){
   document.querySelector(".Mslide>img").src="https://www.bigbasket.com/media/uploads/banner_images/hp_bcd_m_bcd_250123_400.jpg"
}
setInterval(Mfirst,2000);
setInterval(Msecond,4000);
setInterval(Mthird,6000);





