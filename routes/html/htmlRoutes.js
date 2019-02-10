const router = require("express").Router();
const db=require("../../models");

//routes
router.get("/", (req, res) => {
  res.render("index");
});

//on page loading get the journals for the connected user. guest we will use the session staff to do that
router.get("/journals", (req, res) => {
  res.render("journal");
});

module.exports = router;