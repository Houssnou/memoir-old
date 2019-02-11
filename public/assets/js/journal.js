$(document).ready(() =>{
//global variables to store the user infos 
/* 
id: 1
firstName: admin */

let userId;
let userName;

 //ajax call to display the user informations
  $.ajax({
      url: "/api/users/status",
      method: 'GET'
    }).then(function(userInfo) {
      console.log(userInfo);

      //$("#userName").text(userInfo.firstName);
      userId=userInfo.id;
      userName=userInfo.lastName;
      
    })
    .catch(err => console.log(err));

  //event listener for a click on create new journal
  $("#create-journal").on("click",()=>{
    //display the form to input the journal title and the description
    $("#journal-form").show();

  });
  //event listener for a click on add new journal
  $("#save-journal").on("click",(e)=>{
    //prevent reload
    e.preventDefault();

    //build an object
    const journalData={
      title: $("#title-input").val().trim(),
      description:$("#description-input").val().trim(),
      istrashed:false,
      userId:userId
    };
    console.log(journalData);

    //ajax call to insert the new journaL in the db
    $.ajax({
      url:"/api/journals",
      method:"POST",
      data:journalData
    }).then(result=>{
      console.log(result);
      //empty the input fields
      $("#title-input").val("");
      $("#description-input").val("");
      //then hide the form again
      $("#journal-form").hide();
    });
  });

});