const db=require("../models");
module.exports = {
  //select all users
  getAllUsers: (req, res) => {
    db
      .Users
      .findAll()
      .then(dbUsers => {
        res.json(dbUsers);

      })
      .catch(err => {
        console.log("Select All Error: " + err);
        res.status(400).json(err);
      });
  },
  //check if user is logged in
  userCheck: function (req, res) {
    if (req.user) {
      console.log(req.user);
      return res.json(req.user);
    } else {
      return res.status(422).json({
        error: "Not logged in!"
      })
    }
  },
  //add a user where we will make use of all passport and others sh*t
  register: function (req, res) {
    db
      .Users
      .create(req.body)
      .then(function (userInfo) {
        // Upon successful signup, log user in
        req
          .login(userInfo, function (err) {
            if (err) {
              console.log(err)
              return res
                .status(422)
                .json(err);
            }
            console.log(req.user);
            return res.json("/");
          });
      })
      .catch(function (err) {
        console.log(err);
        res
          .status(422)
          .json(err);
      });
  },
  login: function (req, res) {
    console.log(req.user);
    res.json("/journals");
  },

  //update a user /:id
  changePassword: (req, res) => {
    // console.log(req.body);
    db.Users.update({
        password: req.body.password
      }, {
        where: {
          id: req.params.id
        }
      }).then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log("Change Password Error: " + err);
        res.status(400).json(err);
      });

  },

  //delete a user
  deleteUser: (req, res) => {
    db.Users.destroy({
        where: {
          id: req.params.id
        }
      }).then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log("Delete Erro: " + err);
        res.status(400).json(err);
      });

  },

  // marian: add accountInfo
  // Write the post call to save the user info
  // For that you will need to finish of the following method 
  // and then you will need to change the user model to store address
  // you can create one address table with address and userid as the foreign key.
  
  // Step 1: Get the user input in the front end(Done)
  // Step 2: Write the api and make sure you get the user input from the front-end through 
  //         POST call
  // Step 3: Once you get the data in the backend server you will need to save it in the 
  //         MySQL database.
  addAccountInfo: (req, res) => {
    db.Users
    .create(req.body)
    .then(function (userInfo) {
      // Upon successful signup, log user in
      req
        .login(userInfo, function (err) {
          if (err) {
            console.log(err)
            return res
              .status(422)
              .json(err);
          }
          console.log(req.user);
          return res.json("/");
        });
    })
    .catch(function (err) {
      console.log(err);
      res
        .status(422)
        .json(err);
    });

  }

}