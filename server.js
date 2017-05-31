
// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var path = require('path');

var mongoose = require("mongoose");
var Article = require("./models/Article.js");

// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");



// Initialize Express
var app = express();


// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));


// Set Handlebars.
var exphbs = require("express-handlebars");

app.set('views', path.join(__dirname, '/views'));
app.engine("handlebars", exphbs({ defaultLayout: "layout" }));
app.set("view engine", "handlebars");

// =========  Database configuration with mongoose ===============
// ---------  define local MongoDB URI ----------
var localMongo = "mongodb://localhost/nytreact";
//var MONGODB_URI = 'mongodb://heroku_7787qsks:gp9jm8tkki1fks0g95rnac6of2@ds147551.mlab.com:47551/heroku_7787qsks';

//mongoose.connect(localMongo);

if (process.env.MONGODB_URI){
    // this executes if this is being executed in heroku app
    mongoose.connect(process.env.MONGODB_URI);
} else {
    // this ececutes if this is being executed on local machine
    mongoose.connect(localMongo);
}

// =========  End databse configuration  ================

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


//  ============  Routes  =====================
// Here we create a variable for holding the name and birthday
var name = "Ahmed";
var dob = moment("02/14/1989", "MM/DD/YYYY");

ReactDOM.render(
  <div className="main-container">
    <div className="container">
      <div className="jumbotron">

        {/* Inserted the name, birthday, and age */}
        <h2>My name is {name}.</h2>
        <h1>I was born on {dob.format("MM/DD/YYYY")}</h1>
        <hr />
        <h2>That makes me: {dob.fromNow(true)} old.
        </h2>
      </div>
    </div>
  </div>, document.getElementById("app"));



// Listen on port 8001
app.listen(8003, function() {
  console.log("App running on port 8003");
});
