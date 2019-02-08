//import all dependencies
const express = require("express");

//set up the APP
const app = express();
const PORT = process.env.PORT || 5000;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App running on server http://localhost:" + PORT);
  });
});
