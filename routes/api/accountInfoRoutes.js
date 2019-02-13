const router = require("express").Router();
const accountInfoController = require("../../controllers/accountInfoController");

// methods for /api//:journalId (GET) 
router
  .route("/accounts/:journalId")
  .get(accountInfoController.getUserAccountInfo);

module.exports = router;