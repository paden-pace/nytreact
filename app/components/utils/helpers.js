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

  runArtilceQuery: function(term) {
    console.log(term);

    var newQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + term + "&api-key=" + apiKey;
    return axios.get(newQueryURL).then(function(response) {

      var displayArray = [];

        var display = {
          title : response.data.response.docs[0].headline.main,
          date : response.data.response.docs[0].pub_date,
          url : response.data.response.docs[0].web_url
        };
        displayArray.push(display);


      console.log("This is Display");
      console.log(displayArray);

      // If get get a result, return that result's formatted address property
      if (displayArray) {
        console.log("It exists");
        return displayArray;
      } else {
        console.log("It don't exists");
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getArticle: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postArticle: function(title) {
    return axios.post("/api", { title: title });
  }
};

// We export the API helper
module.exports = helper;
