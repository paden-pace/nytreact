// Include React
var React = require("react");

/*// Creating the Results component
var Results = React.createClass({


  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">
          <h1>Title:</h1>
          <p>{[this.props[0].title]}</p>
          <h3>Date:</h3>
          <p>{this.props.date}</p>
          <h3>URL:</h3>
          <p>{this.props.url}</p>
          <button
            className="btn btn-success"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    );
  }
});*/

const Results = (props) => {
  //Old way to code the line below
  //var style = props.style;
  const { data } = props;
  const { handleClick } = props;
  console.log("data from Results.js");
  console.log(data);
  if (data){
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        {
          data.map((item, index) => (
            <div className="results-single panel-body text-center">
              <div className="results-single-title">
                {"Title: " + item.title}
              </div>
              <div className="results-single-url">
                {"URL: " + item.url}
              </div>
              <div className="results-single-date">
                {"Date: " + item.date}
              </div>
              <button
                className="btn btn-success"
                type="submit"
                onClick={() => handleClick(item.title, item.url, item.date)}
              >
                Save Article
              </button>
            </div>
          ))
        }
      </div>
    );
  } else {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">
          <h4>Results will display here</h4>
        </div>
      </div>
    );
  }
};




// Export the component back for use in other files
module.exports = Results;
