let nav = 

`
<div>
<a href="./index.html"><img id="logo" src="logo.jpeg" alt=""></a>
</div>
<div id="search">

<form action="" class="search_bar">
    <input  type="text" id="search-2" placeholder="search for product" >
    <button>Search</button>
    

<form action="" id="search-form">
    <input type="text" placeholder="search for product" id=form-search>
    <input type="submit">

</form>
</div>

<div id="home">
<a href="index.html">HOME</a>
<a href="">ABOUT</a>
<a href="">SERVICES</a>
<a href="">CONTACT</a>
</div>


<div id="login">
<div>

   
    <a href="">Login/SignUp</a>
    
    


    <a href="signup.html" id="rlogin" >Login/SignUp</a>


</div>


<div id="basket" onclick="window.location.href='cart1.html'">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJIqso8C1IWNREoH1G489UcD8PvgT1jRzqeAjFDlJ0xpVzEuUP1c1mj4Og0EwjS4GgmBM&usqp=CAU"

<div>
    <img id = "cart_image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJIqso8C1IWNREoH1G489UcD8PvgT1jRzqeAjFDlJ0xpVzEuUP1c1mj4Og0EwjS4GgmBM&usqp=CAU"

        alt="">
    <h3>My Basket</h3>
    <h3 id="cart_count">0</h3>
</div>
</div>

`
// 
export default nav

// let searchinput = document.getElementById("search-2")

// // let api = 

// async function apicall(){
//     let  search =searchinput.value;

//     if(search !==""){
//         let api = (`https://macho-hair-backend.vercel.app/${search}`);
//         try {
//             let req = await fetch(api);
//             let data = req.json();
    
//             console.log(data)
            
//         } catch (error) {
//             console.log(error)
//         }
//     }
       

// }
// apicall()

