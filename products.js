

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

// let filterBrand = document.querySelectorAll("#brand input")
// let filterBrandArray = [];
let filterCategory = document.querySelectorAll("#category input")
let filterCategoryArray = [];



// for(let brand of filterBrand){

//     brand.addEventListener("change",(e)=>{
//        filterBrandFun(e);
//     })
// }

// for(let cat of filterCategory){
//    cat.addEventListener("change",(e)=>{
//       filterCategoryFun(e);
//       // console.log(cat);
//    })
// }

// function filterBrandFun(e){

//     if(e.target.checked){
//       filterBrandArray.push(e.target.id)
//     }

//     else{
//        filterBrandArray = filterBrandArray.filter(el=>el!=e.target.id)
//     }

//     showFilter(filterBrandArray,filterCategoryArray)

// }

// function filterCategoryFun(e){

//     if(e.target.checked){
//       filterCategoryArray.push(e.target.id)
//     }

//     else{
//        filterCategoryArray = filterCategoryArray.filter(el=>el!=e.target.id)
//     }

//     showFilter(filterBrandArray,filterCategoryArray)
// };

// function showFilter(bArr=[],cArr=[]){

//      if(bArr.length==0&&cArr.length==0){
//        renderData(allData)
//      }

//      else{
//       let a1 = [];
//       let a2 = [];
//       if(bArr.length){

//          for(let i=0;i<bArr.length;i++){

//             let filter = allData.filter(item=>{
//                return item.title==bArr[i];
//             })

//             for(let i=0;i<filter.length;i++){
//                 a1.push(filter[i])
//             }
//          }
//       }
//       if(cArr.length){

//          for(let i=0;i<cArr.length;i++){

//             let filter = allData.filter(item=>{
//                return item.category==cArr[i];
//             })

//             for(let i=0;i<filter.length;i++){
//                 a2.push(filter[i])
//             }
//          }
//       }

//       // else{
//       //    a2 = a1;
//       // }
    
//       let data = [...a1,...a2];

//       let uniqueData = data.filter((obj, i, arr) =>
//           i=== arr.findIndex((o) => o.id === obj.id)
//       );



       
//       // console.log({a1},{a2});
//       // console.log({x})
//       // let y = [`title=${a1.join("&")}&category=${a2.join("&")}`]
//    //  console.log(y);
//       // let url = "https://macho-hair-backend.vercel.app/all&"
//          renderData(uniqueData)
//      }  //else ends here
// }
























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
async function fetchData(page=1){
 let isLoader = true;
  
   try {

    if(isLoader){
      //   console.log(loaderImg);
      loaderImg.src = "loader.gif"
      container.style.display = "block";
        container.innerHTML = null;
         container.append(loaderImg)
     }

    let res = await fetch(`https://macho-hair-backend.vercel.app/all?_limit=${limit}&_page=${page}`);


   //  console.log({page},{limit});
    totalItems = res.headers.get("x-total-count");
   totalProductDiv.innerText = `There are total ${totalItems} items to explore`

    console.log(totalItems);

   //  console.log(res.headers.get("X-Total-Count"));
    console.log(res);
    
    let data = await res.json();
    
    
    allData = data;
    let totalPages = Math.ceil(totalItems/limit);

    
   setTimeout(() => {
      container.innerHTML = null;
      container.style.display = "grid"
      isLoader = false;
      if(!isLoader){
         renderData(data)
         renderPages(totalPages)
     }
   },800);

  } catch (error) {
   console.log(error);
  }

}


function renderPages(pages){

   let arr = [];

   for(let i=1;i<=pages;i++){
      arr.push(`<button data-page-number=${i}>${i}</button>`)
   }

   // console.log(arr);
   pagesDiv.innerHTML = arr.join("");
   // console.log(pagesDiv);

   let all_btn = document.querySelectorAll("#pagination-wrapper button");

   for(let btn of all_btn){
       btn.addEventListener("click",(e)=>{

         console.log(e.target.dataset.pageNumber);
           fetchData(e.target.dataset.pageNumber)
           window.scrollTo({ top: 0,behaviour:"smooth" });
       })
   }
}














function renderData(product){
   
   console.log(product,"this line");
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
            alert(`${JSON.stringify(obj)} has been added to cart 🚀`)
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

