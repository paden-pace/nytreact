// Include React
var React = require("react");


const Article = (props) => {
  //Old way to code the line below
  //var style = props.style;
  const { data } = props;
  const { handleClick } = props;
  console.log("data from Article.js");
  console.log(data);
  if (data){
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Articles</h3>
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
                className="btn btn-danger"
                type="submit"
                onClick={() => handleClick(item._id)}
              >
                Remove Article
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
          <h3 className="panel-title text-center">Saved Articles</h3>
        </div>
        <div className="panel-body text-center">
          <h4>Saved Articles will display here</h4>
        </div>
      </div>
    );
  }
};

// This is the Article component. It will be used to show a log of  recent searches.
/*var Article = React.createClass({
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Articles</h3>
        </div>
        
        <div className="panel-body text-center">


          {this.props.article.map(function(search, i) {
            return (
              <p key={i}>{search.title}  {search.date}</p>
            );
          })}
        </div>
      </div>
    );
  }
});*/

// Export the component back for use in other files
module.exports = Article;
