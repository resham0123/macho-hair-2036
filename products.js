

import nav from "./navbar.js";
import footer from "./footer.js"

let navDiv = document.getElementById("nav");
let footerDiv = document.getElementById("footer");
navDiv.innerHTML = nav;
footerDiv.innerHTML = footer;

let cartArr = JSON.parse(localStorage.getItem("macho-cart"))||[];



let container = document.getElementById("product-container")
let sortFilter = document.getElementById("sort-price");
let pagesDiv = document.getElementById("pagination-wrapper")
let allData = [];
let limit = 20;


let totalItems
let totalProductDiv = document.getElementById("count-product");

let loaderImg = document.createElement("img");
loaderImg.setAttribute("class","loaderImg");

let url = `https://macho-hair-backend.vercel.app/all`

fetchData()

let filterBrand = document.getElementById("brand-form");
let filterCategory = document.querySelectorAll("#category p")
let sortSliceForm = document.querySelector("#sort-slice-form");
sortFilter.addEventListener("click",sortData);
filterBrand.addEventListener("submit",brandForm)
function brandForm(e){
   e.preventDefault();
   let string = document.getElementById("brand-search").value;
   let brand = string.charAt(0).toUpperCase()+string.slice(1);
   console.log(brand);
   url = `https://macho-hair-backend.vercel.app/all?title=${brand}&`;
   fetchData(url);
   // string.value="";
}
for(let item of filterCategory){

   item.addEventListener("click",(e)=>{
      //  filterFun(e)
       let x = e.target.id;
       console.log(x);
      url = `https://macho-hair-backend.vercel.app/${x}?`;

      fetchData(url)
   })

}

function sortData(){
     if(sortFilter.value=="asc"){
      //    console.log("allData  ",allData);
      //   let ascen = allData.sort((a,b)=>a.price-b.price);

      url = `https://macho-hair-backend.vercel.app/all?_sort=price&_order=asc`
      
       fetchData(url)
     }

     if(sortFilter.value=="desc"){

      url = `https://macho-hair-backend.vercel.app/all?_sort=price&_order=desc`
      
      fetchData(url)
     }

   }

sortSliceForm.addEventListener("submit",(e)=>{
    e.preventDefault();
   let min = document.getElementById("slice-min").value
   let max = document.getElementById("slice-max").value

   console.log(min,max);

   url = `https://macho-hair-backend.vercel.app/all?price_gte=${min}&price_lte=${max}&`

   fetchData(url)

})


async function fetchData(url=`https://macho-hair-backend.vercel.app/all?`,page=1){
 let isLoader = true;
  
   try {

    if(isLoader){
      //   console.log(loaderImg);
      loaderImg.src = "loader.gif"
      container.style.display = "block";
        container.innerHTML = null;
         container.append(loaderImg)
     }

    

    let res = await fetch(`${url}_page=${page}&_limit=${limit}`);


   
    totalItems = res.headers.get("x-total-count");
   totalProductDiv.innerText = `There are total ${totalItems} items to explore`

    console.log(totalItems);

   //  console.log(res.headers.get("X-Total-Count"));
   //  console.log(res);
    
    let data = await res.json();
    
    
    allData = data;
    let totalPages = Math.ceil(totalItems/limit);

    console.log(totalPages);
   setTimeout(() => {
      container.innerHTML = null;
      container.style.display = "grid"
      isLoader = false;
      if(!isLoader){
         renderPages(url,totalPages)
         renderData(data)
     }
   },800);

  } catch (error) {
   console.log(error);
  }

}





function renderData(product){
   
   // console.log(product,"this line");
    container.innerHTML = null;


   let cardData =  product.map(item=>{
      return getCard(item)
   }).join("")


   container.innerHTML = cardData;

   let add_btns = document.querySelectorAll(".product-add-btn");

   for(let btn of add_btns){

      btn.addEventListener("click",(e)=>{
         let id = e.target.getAttribute("data-id")
         let title = e.target.getAttribute("data-title")
         let img = e.target.getAttribute("data-img")
         let price = e.target.getAttribute("data-price")
         let category = e.target.getAttribute("data-category");
         let delivery = e.target.getAttribute("data-category");

         let obj = {
            id:id,
            title:title,
            img:img,
            price:price,
            category:category,
            delivery:delivery
         }

         if(checkLocal(id)){
            alert("Product already in cart")
         }
         else{

            cartArr.push(obj);
            localStorage.setItem("macho-cart",JSON.stringify(cartArr))
            
           //  console.log(x);
            alert(`${JSON.stringify(obj)} has been added to cart`)
         }
        
      })
   }

}

function checkLocal(id){

     for(let i=0;i<cartArr.length;i++){
        if(cartArr[i].id==id){
           return true
        }
     }
     return false
}

function getCard({id,img,category,title,quantity,price,delivery}){
// console.log("🚀 ~ file: products.js:52 ~ getCard ~ img,category,title,quantity,price,delivery:", img,category,title,quantity,price,delivery)
  
   
    let card =   `<div>

    <img src="${img}" alt="${title}">
    <p>Title: ${title}</p>
    <p>Category: ${category}</p>
    <p>&#x20B9 ${price}</p>
    <p>&#9951 ${delivery} &#9203</p>
   
    <button class="product-add-btn" data-id=${id} data-price=${price} data-title=${title} data-img=${img} data-category=${category} data-delivery=${delivery} data-quantity=1>Add To Cart</button>
      </div>`


      return card
       
   
}



function renderPages(url,pages){
  
   let arr = [];

   for(let i=1;i<=pages;i++){
      arr.push(`<button data-page-number=${i}>${i}</button>`)
   }

   // console.log(arr);
   pagesDiv.innerHTML = arr.join("");
   console.log(pagesDiv);
   // console.log(pagesDiv);

   let all_btn = document.querySelectorAll("#pagination-wrapper button");

   for(let btn of all_btn){
       btn.addEventListener("click",(e)=>{

         console.log(e.target.dataset.pageNumber);
           fetchData(url,e.target.dataset.pageNumber)
           window.scrollTo({ top: 0,behaviour:"smooth" });
       })
   }
}

