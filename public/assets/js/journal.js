$(document).ready(() => {
  //global variables to store the user infos 
  var userId;
  var userName;
  //ajax call to display the user informations
  $.ajax({
      url: "/api/users/status",
      method: 'GET'
    }).then(function (userInfo) {
      //console.log(userInfo);

      //$("#userName").text(userInfo.firstName);
      userId = userInfo.id;
      userName = userInfo.lastName;

      //on load display all users journals
      $.ajax({
        url: "/api/journals/users/" + userId,
        method: "GET"
      }).then(bdJournals => {
        console.log("All user Journals");
        console.log(bdJournals);
        //build the list of the journal for the right side of the navbar
        //<a class="list-group-item list-group-item-action" href="#list-item-2"><span class="entrySpan">Journal 1</span></a>
        //create the listitem
        bdJournals.forEach((journal, index) => {
          //create the item as a list item 
          const journalItem = $(`<a class='mdb-color list-group-item list-group-item-action' href='#list-item-${index}'>`);

          //save the journal data with the attr method to be able to get all the entries attached to this journal 
          journalItem.attr("data-id", journal.id);

          const journalItemSpan = $("<span class='entrySpan'>").text(journal.title).appendTo(journalItem);

          //then append it to the div id="list-journals"
          $("#list-journals").append(journalItem);
        });
      });

    })
    .catch(err => console.log(err));


  //event listener for a click on create new journal
  $("#create-journal").on("click", () => {
    //display the form to input the journal title and the description
    // if #journal-form display:none === true then click will show else on click will hide
     $("#journal-form").toggle();

  });
  //event listener for a click on add new journal
  $("#save-journal").on("click", (e) => {
    //prevent reload
    e.preventDefault();

    //build an object
    const journalData = {
      title: $("#title-input").val().trim(),
      description: $("#description-input").val().trim(),
      istrashed: false,
      userId: userId
    };
    console.log(journalData);

    //ajax call to insert the new journaL in the db
    $.ajax({
      url: "/api/journals",
      method: "POST",
      data: journalData
    }).then(result => {
      console.log(result);
      //empty the input fields
      $("#title-input").val("");
      $("#description-input").val("");
      //then hide the form again
      $("#journal-form").hide();
      
      // clear list of journals then use a loop to make the list appear again
      $("#list-journals").empty();
      updateSidenav();

    });
  });

  //event listener for a click on a journal item
  $(document).on("click", ".list-group-item", function (event) {

    //get the id of the journal tru the data-id
    const journalId = $(this).attr("data-id");

    console.log(journalId);
    console.log(userId);
    //display the button to create a new entry
    $("#listedEntries").show();

    //display entries for a journal
    $.ajax({
      url: "/api/entries/journals/" + journalId,
      method: "GET"
    }).then(dbEntries => {
      console.log(dbEntries);
      //build the list of the journal for the right side of the navbar
      //<a class="list-group-item list-group-item-action" href="#list-item-2"><span class="entrySpan">Journal 1</span></a>
      //create the listitem
      dbEntries.forEach((entry, index) => {
        //create the item as a list item 
        const entryItem = $(`<a class='list-group-item list-group-item-action' href='#list-item-${index}'>`);
      
        //save the journal data with the attr method to be able to get all the entries attached to this journal 
        entryItem.attr("data-id", entry.id);

        const entryItemSpan = $("<span class='entrySpan'>").text(entry.title).appendTo(entryItem);

        //then append it to the div id="list-journals"
        $("#list-entries").append(entryItem);
      });

    });

    //event listener for a click on create entry
    $("#create-entry").on("click", () => {
      //display the form to input the journal title and the description
      $("#entry-form").show();
    });

    //event listener for a click on save entry
    $("#save-entry").on("click", (e) => {
      //prevent reload
      e.preventDefault();

      //build an object
      const entryData = {
        title: $("#entry-title").val().trim(),
        body: $("#entry-body").val().trim(),
        istrashed: false,
        journalId: journalId,
        userId: userId
      };
      console.log(entryData);
      //ajax call to display all entries for a journal
      $.ajax({
        url: "/api/entries",
        method: "POST",
        data: entryData
      }).then(result => {
        console.log(result);
        //just refresh page for proof of concept
        location.reload();
      });
    });

  }); 



const updateSidenav = () => { //i copy n paste
  $.ajax({
    url: "/api/users/status",
    method: 'GET'
  }).then(function (userInfo) {
   
    userId = userInfo.id;
    userName = userInfo.lastName;

    $.ajax({
      url: "/api/journals/users/" + userId,
      method: "GET"
    }).then(bdJournals => {
  
      bdJournals.forEach((journal, index) => {

        const journalItem = $(`<a class='mdb-color list-group-item list-group-item-action' href='#list-item-${index}'>`);

        journalItem.attr("data-id", journal.id);

        const journalItemSpan = $("<span class='entrySpan'>").text(journal.title).appendTo(journalItem);
        
        $("#list-journals").append(journalItem);
      });
    });

  })
  .catch(err => console.log(err));
}


//Marian
$("#accoutSavings").on("click", () => {
  const email = $("#inputEmail4MD").val().trim();
  const passWord =$("#inputPassword4MD").val().trim();
  const address = $("#inputAddressMD").val().trim();
  const address2 =$("#inputAddress2MD").val().trim();
  const inputCity= $("#inputCityMD").val().trim();
  const inputZip= $("#inputZip").val().trim();
  const inputAccount= $("#inputAccountSave").val().trim();
  console.log(email);


 $.ajax({
  url: '/ajax-requestPost',
  type: 'POST',
  data: {email: email, title: title, address: address, address2:address2, City:inputCity, zip:inputZip, account: inputAccount},
  error: function() {
     alert('error');
  },
  success: function(data) {
       $("tbody").append("<tr><td>"+title+"</td><td>"+description+"</td></tr>");
       alert("Record added successfully");  
  }
})})
})