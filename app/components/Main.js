// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var Article = require("./children/Article");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this article state variable
  getInitialState: function() {
    return { searchTerm: "", results: "", article: [] };
  },

  // The moment the page renders get the Article
  componentDidMount: function() {
    // Get the latest article.
    helpers.getArticle().then(function(response) {
      console.log("response");
      console.log(response);
      if (response !== this.state.article) {
        console.log("Article", response.data);
        this.setState({ article: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {

    // Run the query for the title
    helpers.runArtilceQuery(
      this.state.searchTerm, 
      this.state.searchStart,
      this.state.searchEnd
    
    ).then(function(data) {
      if (data !== this.state.results) {
        console.log("All Data: ");
        console.log(data);
        this.setState({ results: data});

        // After we've received the result... then post the search term to our article.
        // helpers.postArticle(this.state.searchTerm).then(function() {
        //   console.log("Updated!");

        //   // After we've done the post... then get the updated article
        //   helpers.getArticle().then(function(response) {
        //     console.log("Current Article");
        //     console.log("Current Article", response.data);

        //     console.log("Article", response.data);

        //     //this.setState({ article: response.data });

        //   }.bind(this));
        // }.bind(this));
      }
    }.bind(this));
  },
  // This function allows childrens to update the parent.
  setTerm: function(term, start, end) {
    this.setState({ searchTerm: term, searchStart: start, searchEnd: end  });
  },
  
  saveArticle: function(title, url, date){
    console.log("Save Article Clicked!")
    console.log("Title:" + title);
    console.log("URL:" + url);
    console.log("Date:" + date);
    const newArticle = {
      title: title,
      url: url,
      date: date
    }
    // After we've received the result... then post the search term to our article.
        helpers.postArticle(newArticle).then(function() {
          console.log("Updated!");

          // After we've done the post... then get the updated article
          helpers.getArticle().then(function(response) {
            console.log("Current Article");
            console.log("Current Article", response.data);

            console.log("Article", response.data);

            this.setState({ article: response.data });

          }.bind(this));
        }.bind(this));
  },

  deleteArticle: function(id){
    console.log("Delete Article Clicked!")
    console.log("ID: " + id);
    helpers.deleteArticle(id).then(function() {
      console.log("From Main.js Deleted!");
             // After we've done the post... then get the updated article
          helpers.getArticle().then(function(response) {
            console.log("Current Article");
            console.log("Current Article", response.data);

            console.log("Article", response.data);

            this.setState({ article: response.data });

          }.bind(this));
        }.bind(this));
  },
  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">New York Times Search</h2>
            <p className="text-center">
              <em>Enter a subject to search the New York Times for it (ex: "Barack Obama").</em>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Form setTerm={this.setTerm} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Results data={this.state.results} handleClick={this.saveArticle}/>
          </div>        
          <div className="col-md-6">
            <Article data={this.state.article} handleClick={this.deleteArticle} />
          </div>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
