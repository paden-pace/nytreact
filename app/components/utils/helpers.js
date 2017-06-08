// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
// var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";

var apiKey= "487d99b39c184f94a13f8b910d24df1d";
             

// Helper functions for making API Calls
var helper = {

  // // This function serves our purpose of running the query to geolocate.
  // runQuery: function(location) {

  //   console.log(location);

  //   // Figure out the geolocation
  //   var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + geocodeAPI;
  //   return axios.get(queryURL).then(function(response) {
  //     // If get get a result, return that result's formatted address property
  //     if (response.data.results[0]) {
  //       return response.data.results[0].formatted;
  //     }
  //     // If we don't get any results, return an empty string
  //     return "";
  //   });
  // },

  runArtilceQuery: function(term, start, end) {
    console.log("term start end");
    console.log(term);
    console.log(start);
    console.log(end);

    var newQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + term + "&begin_date="+ start+ "&end_date="+ end+ "&api-key=" + apiKey;
    return axios.get(newQueryURL).then(function(response) {

      var displayArray = [];
      for (var i = 0; i<response.data.response.docs.length; i++)
        {
          //console.log(response.data.response.docs[i].headline);
          var display = {
            title : response.data.response.docs[i].headline.main,
            date : response.data.response.docs[i].pub_date,
            url : response.data.response.docs[i].web_url
          };
          displayArray.push(display);
        }

      console.log("This is Display");
      console.log(displayArray);

      // If get get a result, return that result's formatted address property
      if (displayArray) {
        console.log("It exists");
        return displayArray;
      } else {
        console.log("It don't exists");
      }
      //If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getArticle: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postArticle: function(newArticle) {
    console.log("Value from helpers.js")
    console.log(newArticle);
    return axios.post("/api", { 
      title: newArticle.title,
      date: newArticle.date,
      url: newArticle.url });
  },

    // This function posts new searches to our database.
  deleteArticle: function(id) {
    console.log("Delete Value from helpers.js")
    console.log(id);
  //   var thisId = $(this).attr("data-id");
  //   console.log("thisId");
  //   console.log(thisId);
    return axios.post("/delete", { id: id });
  //     date: newArticle.date,
  //     url: newArticle.url });
    
  }
};



// We export the API helper
module.exports = helper;
