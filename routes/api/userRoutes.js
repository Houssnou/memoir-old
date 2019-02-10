const router = require("express").Router();
const usersController = require("../../controllers/userController");

// methods for /api/user (GET and POST) 
router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.addUser);

  //methods for api/users/:id (PUT and DELETE)
router
  .route("/:id")
  .put(usersController.changePassword)
  .delete(usersController.deleteUser);

  
module.exports = router;