$(document).ready(function () {
  console.log("login ready");
  //event listener for a click on login
  $("#loginBtn").on("click", function (event) {

    event.preventDefault();

    const userInfo = {
      email: $("#email-input").val().trim(),
      password: $("#password-input").val().trim()
    };

    console.log(userInfo);
    //ajax call to login the user
    $.ajax({
        url: "api/users/login",
        method: "POST",
        data: userInfo
      })
      .then((userInfo) => {
        location.replace(userInfo)
      })
      .catch(err => console.log(err));
  });

});