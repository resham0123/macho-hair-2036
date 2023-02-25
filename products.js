

import nav from "./navbar.js";
import footer from "./footer.js"

let navDiv = document.getElementById("nav");
let footerDiv = document.getElementById("footer");
navDiv.innerHTML = nav;
footerDiv.innerHTML = footer;

let cartArr = JSON.parse(localStorage.getItem("macho-cart"))||[];



let container = document.getElementById("product-container")
let sortFilter = document.getElementById("sort-price");
let limit = 20;
let pagesDiv = document.getElementById("pagination-wrapper")
let allData = [];

let totalItems
let totalProductDiv = document.getElementById("count-product");

let loaderImg = document.createElement("img");
loaderImg.setAttribute("class","loaderImg");

let url = `https://macho-hair-backend.vercel.app/all`

fetchData(url)


let filterCategory = document.querySelectorAll("#category p")
for(let item of filterCategory){

   item.addEventListener("click",(e)=>{
      //  filterFun(e)
       let x = e.target.id;
       console.log(x);
      let url = `https://macho-hair-backend.vercel.app/${x}`;

      fetchData(url)
   })

}







sortFilter.addEventListener("click",sortData);

function sortData(){

     isLoader = true

   //   if(isLoader){
   //    //   console.log(loaderImg);
   //      loaderImg.src = "loader.gif"
   //      container.innerHTML = null;
   //       container.append(loaderImg)
   //   }

     if(sortFilter.value==""){
      //   isLoader = false
        renderData(allData)
     }

     if(sortFilter.value=="asc"){
         console.log("allData  ",allData);
        let ascen = allData.sort((a,b)=>a.price-b.price);
      //   console.log("asecn ",ascen);
      //   isLoader = false;
        renderData(ascen)
     }

     if(sortFilter.value=="desc"){

        let descen = allData.sort((a,b)=>b.price-a.price);
        renderData(descen)
     }

   }


async function fetchData(url=`https://macho-hair-backend.vercel.app/all`,page=1){
 let isLoader = true;
  
   try {

    if(isLoader){
      //   console.log(loaderImg);
      loaderImg.src = "loader.gif"
      container.style.display = "block";
        container.innerHTML = null;
         container.append(loaderImg)
     }

    let res = await fetch(`${url}?_page=${page}&_limit=${limit}`);


   
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
    <p>Price: ${price}</p>
    <p>${delivery}</p>
   
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

