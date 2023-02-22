let container = document.querySelector(".products");
let data = JSON.parse(localStorage.getItem("grocery"))||[];

// fetch("./all.json")
//     .then((res)=>{
//         return res.json()
//     })
//     .then((ans)=>{
//          filtereData = ans
//         display(ans)
//     })
//     .catch((error)=>{
//         console.log(error)
//     })

display(data)
function display(data){
    container.innerHTML = null;
    data.forEach((element,index)=>{
        
        let cart = document.createElement("div")
        let img = document.createElement("img")
        img.setAttribute("src",element.img)
        let type = document.createElement("p")
        type.textContent = element.type;
        let name = document.createElement("h4")
        name.textContent = element.name;
        let rating = document.createElement("p")
        rating.textContent = element.rating;
        let price = document.createElement("h5")
        price.textContent = element.price
        let rem = document.createElement("button");
       rem.textContent = "-"

       rem.addEventListener("click",function(){
         basketData[index].item--;
         localStorage.setItem("basket",JSON.stringify(basketData))
         display(basketData)
         if(basketData[index].item==0){
           basketData.splice(index,1)
         }
       })

       let inc = document.createElement("button");
       inc.textContent = "+"

       inc.addEventListener("click",function(){
         basketData[index].item++;
         localStorage.setItem("grocery",JSON.stringify(basketData))
         display(basketData)
       })
       let item = document.createElement("span");
      item.textContent = element.item



        let remove = document.createElement("button");
        remove.textContent = "Delete";
        remove.setAttribute("id","delete")
        remove.addEventListener("click",function(){
        deletedData(index)
     })
        cart.append(img,type,name,rating,price,inc,item,rem,remove);
        container.append(cart)
    })
}
function deletedData(index){
   basketdata = basketData.filter(function(element,i){
     return i!== index
   })
   localStorage.setItem("grocery",JSON.stringify(basketdata));
   display(basketdata)
   window.location.reload();
 }