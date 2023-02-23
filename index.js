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
 
 document.querySelector("#rsign").addEventListener("click",()=>{
   console.log("hii");
  document.querySelector("#rsignupage").classList.add("active");
 })

