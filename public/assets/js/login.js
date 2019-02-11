$(document).ready(function() {
  console.log("ready");


  $("#loginBtn").on("click", function() {
    console.log("you clicked me");

    let loginEmail = $("#loginEmail").val().trim();
    let loginPass = $("#loginPass").val().trim();
    
    console.log(loginEmail);
    console.log(loginPass);
   
  })

})