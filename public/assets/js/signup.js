$(document).ready(function() {
  console.log("ready");


  $("#registerAccountBtn").on("click", function() {
    console.log("clicked");

    let firstName = $("#firstName-input").val().trim();
    let lastName = $("#lastName-input").val().trim();
    let email = $("#email-input").val().trim();
    let password = $("#pass-input").val().trim();
    let passConfirm = $("#passConfirm-input").val().trim();
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
    console.log(passConfirm);
  })

})