document.querySelector("#admin").addEventListener("click",()=>{
    window.location.href="./admin/admin.html";
})
let mob=localStorage.getItem("mobileNo");
let getotp=localStorage.getItem("otp");
document.querySelector("#logo1").addEventListener("click",()=>{
    location.href="quality.html"
})
document.querySelector("#logo2").addEventListener("click",()=>{
    location.href="quality.html"
})
let ranOtp = Math.floor(Math.random() * 9000 + 1000);
document.querySelector("#continue").addEventListener("click",()=>{
    let mobileNo=document.querySelector("#mobile").value;
    localStorage.setItem("mobileNo",mobileNo);
    if(mob.length==10 && mobileNo.length !==4){
console.log(`<<<<<<,GEToTP<<<`,getotp, mobileNo.length)
        
        document.querySelector("#rlogin").innerText="Verify MobileNumber";
        document.querySelector("#btn").innerText=" OTP Sent Successfully";
     
        document.querySelector("#continue").innerText="Verify With OTP";
        
//x.innerText="hii";

let y=document.createElement("h6");
let timeup=10;
let timer=setInterval(function(){
timeup--;
y.innerText= "00:"+ timeup;
if(timeup<=0){
    clearInterval(timer);
   // location.href="signup.html";
}
},1000);
        document.querySelector("#continue").style.width="50%";
      //  document.querySelector("#continue").style.font-size:"5px";
        document.querySelector("#p").innerText="Please check the otp sent to your mobile number";
        document.querySelector("#h1").innerText=mob;
        alert(ranOtp);
        document.querySelector("#mobile").value="";
        document.querySelector("#mobile").placeholder="enter otp here";
        document.querySelector("#resend").innerText="resend otp";
        localStorage.setItem("otp",ranOtp);
       document.querySelector("#btn").setAttribute("id",rbtn);
       document.querySelector("#continue").addEventListener("click",()=>{
        let checkotp=document.querySelector("#mobile").value;
        console.log(checkotp);
       // if(getotp==checkotp){
        alert("OTP matched successfully");
        location.href="index.html";
       // }else{
       //     alert("OTP doesn't match");
       // }
       })
    // let button2=document.createElement("button");
    // button2.innerText="Continue";
    // document.querySelector("#r1signupage").append("button2");
    }else if(ranOtp == mobileNo){
        alert("otp verified successfully");
        location.href="index.html";
    }
    else{
        console.log(`<<<<RRR`,random,mobileNo)
        alert("Please fill correct mobile number");
        
    }
})

document.querySelector("#btn").addEventListener("click",()=>{
    document.querySelector("#mobile").value="";
    document.querySelector("#mobile").placeholder="enter email here";
   // let email=document.querySelector("#mobile");
   // localStorage.setItem("email",email);
   document.querySelector("#continue").addEventListener("click",()=>{
    alert(ranOtp);
    document.querySelector("#mobile").value="";
   })
    
});
