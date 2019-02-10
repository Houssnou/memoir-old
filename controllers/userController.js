//import models dependency
const db = require("../models");

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

  //add a user
  addUser: (req, res) => {
    //console.log (req.body)
    db.Users.create().then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log("Create User Error: " + err);
        res.status(400).json(err);
      });
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