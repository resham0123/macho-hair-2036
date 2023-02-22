let mob=localStorage.getItem("mobileNo");
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
    if(mob.length==10){

        alert(ranOtp);
        document.querySelector("#rlogin").innerText="Verify MobileNumber";
        document.querySelector("#btn").innerText=" OTP Sent Successfully";
        document.querySelector("#continue").innerText="Verify With OTP";
        document.querySelector("#p").innerText="Please check the otp sent to your mobile number";
        document.querySelector("#h1").innerText=mob;
        

    }else{
        alert("Please fill correct mobile number");
        
    }
})
