var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var config = require("config");
var session = require('express-session');
const dbURL = config.get("mongoDB.url");

// import modules
var controllers = require('./src/controllers');

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("MongoServer is running");
  })
  .catch(err => console.log(err));

var PORT = process.env.PORT || 3000;

var app = express();

//set morgan to log
app.use(logger("dev"));
//use bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("trust proxy", 1);
app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
// set view engine
app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');
//use assets
app.use("/public", express.static(__dirname + "/public"));
// use router
app.use(controllers);

app.listen(PORT, function() {
  console.log(`Server is running on PORT ${PORT}`);
});
