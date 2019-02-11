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

    //add a user where we will make use of all passport and others sh*t
    register: function(req, res) {
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
    res.json("/");
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

  }
}