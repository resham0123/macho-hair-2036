





//nav end*******************************

let card_data = JSON.parse(localStorage.getItem("macho-cart"))||[]
 console.log("cart-list", card_data);

let data_div = document.getElementById("data");

 var total = 0;
var totalitem = 0 ;
display(card_data)
function display(card_data){

    card_data.forEach( product => {
   
        let div = document.createElement("div");
    
        let p_name = document.createElement("p");
    
        p_name.innerText = product.title;
        p_name.style.float="left";
        p_name.setAttribute("class","txt")
    
    
        let p_price = document.createElement("p");
    
        p_price.innerText = product.price;
        console.log(p_price.innerText)
        let image = document.createElement("img");
    
        image.src = product.img;
    
        // p_name.append(p_price);
        
        div.append(image, p_name, p_price);
    
        data_div.append(div);
    
    
        var out = product.price;
         total = total + Number(out);
         console.log(total);
         totalitem += totalitem+Number(1);
    });
}


 console.log(total);
var total_h1 = document.getElementById("mrp");


if(total_h1){

total_h1.innerHTML = "₹"+total;
}

let shop = document.getElementById("shop");
// console.log(shop)

shop.addEventListener("click",()=>{
    console.log("hai")
    window.location.href = "index.html"
})

let add = document.getElementById("add");

add.addEventListener("click",()=>{
    // console.log("hai")
     window.location.href = "address.html"
})
