
let container = document.getElementById("product-container")
let sortFilter = document.getElementById("sort-price");
let allData = [];

let totalItems
let totalProductDiv = document.getElementById("count-product");
let isLoader = true;
let loaderImg = document.createElement("img");

loaderImg.setAttribute("class","loaderImg");
let url = `https://macho-hair-backend.vercel.app/all`

fetchData(url)

let filterBrand = document.querySelectorAll(" #brand input")
let filterBrandArray = [];
let filterCategory = document.querySelectorAll("#category input")
let filterCategoryArray = [];

for(let brand of filterBrand){

    brand.addEventListener("change",(e)=>{
       filterBrandFun(e);
    })
}

for(let cat of filterCategory){
   cat.addEventListener("change",(e)=>{
      filterCategoryFun(e);
      // console.log(cat);
   })
}

function filterBrandFun(e){

    if(e.target.checked){
      filterBrandArray.push(e.target.id)
    }

    else{
       filterBrandArray = filterBrandArray.filter(el=>el!=e.target.id)
    }

    showFilter(filterBrandArray,filterCategoryArray)

}

function filterCategoryFun(e){

    if(e.target.checked){
      filterCategoryArray.push(e.target.id)
    }

    else{
       filterCategoryArray = filterCategoryArray.filter(el=>el!=e.target.id)
    }

    showFilter(filterBrandArray,filterCategoryArray)
};

function showFilter(bArr=[],cArr=[]){

     if(bArr.length==0&&cArr.length==0){
       renderData(allData)
     }

     else{
      let a1 = [];
      let a2 = [];
      if(bArr.length){

         for(let i=0;i<bArr.length;i++){

            let filter = allData.filter(item=>{
               return item.title.toLowerCase==bArr[i].toLowerCase;
            })

            for(let i=0;i<filter.length;i++){
                a1.push(filter[i])
            }
         }
      }
      if(cArr.length){

         for(let i=0;i<cArr.length;i++){

            let filter = allData.filter(item=>{
               return item.category.toLowerCase==cArr[i].toLowerCase;
            })

            for(let i=0;i<filter.length;i++){
                a2.push(filter[i])
            }
         }
      }

      // else{
      //    a2 = a1;
      // }
    
      let x = [...a1,...a2]
     renderData(x)
     }  //else ends here
}





























function renderData(product){

    container.innerHTML = null;

   let cardData =  product.map(item=>{
      return getCard(item)
   }).join("")


   container.innerHTML = cardData;

   let add_btns = document.querySelectorAll(".product-add-btn");

   for(let btn of add_btns){

      btn.addEventListener("click",(e)=>{
         let x = e.target.getAttribute("data-title")
        //  console.log(x);
         alert(`${x} has been added to cart 🚀`)
      })
   }

}


sortFilter.addEventListener("click",sortData);

function sortData(){

     if(sortFilter.value=="asc"){
         console.log("allData  ",allData);
        let ascen = allData.sort((a,b)=>a.price-b.price);
        console.log("asecn ",ascen);
        renderData(ascen)
     }

     if(sortFilter.value=="desc"){

        let descen = allData.sort((a,b)=>b.price-a.price);
        renderData(descen)
     }
}


function getCard({img,category,title,quantity,price,delivery}){
// console.log("🚀 ~ file: products.js:52 ~ getCard ~ img,category,title,quantity,price,delivery:", img,category,title,quantity,price,delivery)
  
   
    let card =   `<div>

    <img src="${img}" alt="${title}">
    <p>Title: ${title}</p>
    <p>Category: ${category}</p>
    <p>Quantity: ${quantity}</p>
    <p>Price: ${price}</p>
    <p>${delivery}</p>
    <button class="product-add-btn" data-title=${title}>Add To Cart</button>
      </div>`


      return card
       
   
}

















async function fetchData(url){

   try {

    if(isLoader){
      //   console.log(loaderImg);
        loaderImg.src = "./loaderProduct.jpg"
        container.innerHTML = null;
         container.append(loaderImg)
     }

    let res = await fetch(url);

    totalItems = res.headers.get("X-Total-Count");

    // console.log(totalItems);
    
    let data = await res.json();
    
    totalProductDiv.innerText = `There are total ${data.length} items to explore`
    isLoader = false;
    allData = data;
    // console.log("🚀 ~ file: products.js:28 ~ fetchData ~ data:", data)

    if(!isLoader){
        renderData(data)
    }

   
    

    
    
   } catch (error) {
    console.log(error);
   }
      
}