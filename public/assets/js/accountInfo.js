//created - Marian -02-12-19


$(document).ready(function () {
  console.log("accountInfo ready");
  //event listener for a click on account info
  $("#accountSave").on("click", function (event) {
    console.log("In save button");
    event.preventDefault();

    const accountInfo = {
      email: $("#inputEmail4MD").val().trim(),
      password: $("#inputPassword4MD").val().trim(),
      address: $("#inputAddressMD").val().trim(),
      address2: $("#inputAddress2MD").val().trim(),
      city: $("#inputCityMD").val().trim(),
      zip: $("#inputZipMD").val().trim()
    };

    console.log(accountInfo);
    //ajax call to user account info
    $.ajax({
        url: "api/users/accountinfo",
        method: "POST",
        data: accountInfo
      })
      .then((accountInfo) => {
        console.log(accountInfo);
        location.replace(accountInfo)
      })
      .catch(err => console.log(err));
  });

});

/*
$(document).ready(function () {
  console.log("faq ready");
  //event listener for a click on account info
  $("#accountSaveBtn").on("click", function (event) {

    event.preventDefault();

    const faq = {
      questions: $("#questions").val().trim(),
      answers: $("#answer").val().trim(),
      help: $("#help").val().trim(),
    
    };


});
*/