import nav from "./nav.js"


let navDiv = document.getElementById("pr-nav");
navDiv.innerHTML = nav;





//nav end*******************************

let card_data = JSON.parse(localStorage.getItem("cart-list"));
//  console.log("cart-list", card_data);

let data_div = document.getElementById("data");
// let arr = [
// {
//     "id":1,
//     "img" : "https://www.bigbasket.com/media/uploads/p/s/20000911_30-fresho-kiwi-green.jpg",
//     "brand":"Fruits and Vegitables",
//     "title": "Kiwi - Green",
//     "quantity":"3 pcs",
//     "price":148.75  

// },
// {
//     "id":2,
//     "img" : "https://www.bigbasket.com/media/uploads/p/s/10000148_30-fresho-onion.jpg",
//     "brand":"Fruits and Vegitables",
//     "title": "Onion",
//     "quantity":"1 kg",
//     "price":63.75

// },
// {
//     "id":3,
//     "img" : "https://www.bigbasket.com/media/uploads/p/s/10000071_14-fresho-carrot-orange.jpg",
//     "brand":"Fruits and Vegitables",
//     "title": "Carrot-Orange",
//     "quantity":"250 g",
//     "price":14.14

// },
// {
//     "id":4,
//     "img" : "https://www.bigbasket.com/media/uploads/p/s/10000142_16-fresho-ladies-finger.jpg",
//     "brand":"Fruits and Vegitables",
//     "title": "Ladies Finger",
//     "quantity":"1 kg",
//     "price":42.75 

// }
// ]
 var total = 0;
var totalitem = 0 ;
data_div.forEach( product => {
   
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


 console.log(total);
var total_h1 = document.getElementById("mrp");


if(total_h1){

total_h1.innerHTML = "₹"+total;
}