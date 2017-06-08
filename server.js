// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Article Schema
var Article = require("./models/Article.js");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------
// ---------  define local MongoDB URI ----------
var localMongo = "mongodb://localhost/nytlocal";
//var MONGODB_URI = 'mongodb://<dbuser>:<dbpassword>@ds151059.mlab.com:51059/heroku_3b1g6fml';

//mongoose.connect(localMongo);

if (process.env.MONGODB_URI){
    // this executes if this is being executed in heroku app
    mongoose.connect(process.env.MONGODB_URI);
} else {
    // this ececutes if this is being executed on local machine
    mongoose.connect(localMongo);
}


// var localMongo = "mongodb://localhost/nytlocal";

// // MongoDB Configuration configuration (Change this URL to your own DB)
// mongoose.connect(localMongo);
// var db = mongoose.connection;

// db.on("error", function(err) {
//   console.log("Mongoose Error: ", err);
// });

// db.once("open", function() {
//   console.log("Mongoose connection successful.");
// });

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get("/api", function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 5
  Article.find({}).sort([
    ["date", "descending"]
  ]).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// This is the route we will send POST requests to save each search.
app.post("/api", function(req, res) {
  console.log("Value from server.js")
  console.log(req.body);
    // Here we'll save the location based on the JSON input.
  // We'll use Date.now() to always get the current date time
  Article.create({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Search");
    }
  });
});

app.post("/delete", function(req, res) {
  console.log("deleted Article: req.body.id: ");
  console.log(req.body.id);

  Article.findByIdAndRemove(req.body.id, function (err, doc){
    if(err) { 
      throw err; 
    } else {
      res.send("Deleted!");
    };
  });
});


// This is the route we will send POST requests to save each search.
// app.post("/api", function(req, res) {
//   console.log("BODY: " + req.body.location);

//   // Here we'll save the location based on the JSON input.
//   // We'll use Date.now() to always get the current date time
//   History.create({
//     location: req.body.location,
//     date: Date.now()
//   }, function(err) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.send("Saved Search");
//     }
//   });
// });



  // // Here we'll save the location based on the JSON input.
  // // We'll use Date.now() to always get the current date time
  // Article.create({
  //   title: req.body.title,
  //   date: req.body.date,
  //   url: req.body.url
  // }, function(err) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   else {
  //     res.send("Saved Search");
  //   }
  // });


// // A GET request to scrape the echojs website
// app.get("/scrape", function (req, res) {

//     console.log("Scrape in Routes reached.")

//     // First, we grab the body of the html with request
//     request("http://www.theonion.com/", function (error, response, html) {
//         // Then, we load that into cheerio and save it to $ for a shorthand selector
//         var $ = cheerio.load(html);
//         // Now, we grab every h2 within an article tag, and do the following:
//         $("article.summary").each(function (i, element) {

//             // Save an empty result object
//             var result = {};

//             // Add the text and href of every link, and save them as properties of the result object
//             result.title = $(this).children("div").children("div").children("header").children("h2").text();
//             result.link = $(this).children("a").attr("href");

//             // Using our Article model, create a new entry
//             // This effectively passes the result object to the entry (and the title and link)
//             var entry = new Article(result);

//             console.log("-------------------------------------");
//             console.log("Entry: ");
//             console.log(entry);
//             console.log("-------------------------------------");

//             // Now, save that entry to the db
//             entry.save(function (err, doc) {
//                 // Log any errors
//                 if (err) {
//                     console.log(err);
//                 }
//                 // Or log the doc
//                 else {
//                     console.log(doc);
//                 }
//             });
//         });
//         //res.redirect('/scraped');
//     });
//     // Tell the browser that we finished scraping the text
//     res.send("Scrape Complete");
// });

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
