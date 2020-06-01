import React from 'react';
import axios from 'axios';
import Article from '../components/Article';
import CustomForm from '../components/Form';


class ArticleList extends React.Component {
  state = {
    articles: [],
    error: null
  }

  handleServerResponse = newData => {
    const articles = [...this.state.articles];
    articles.unshift(newData);
    this.setState({articles});
  }

  handleServerError = errorMsg => {
    this.setState({
      error: errorMsg
    });
  }

  componentDidMount() {
    axios.get("https://django-react-fullapp.herokuapp.com/api/articles/")
    .then(res => {
      this.setState({
        articles: res.data
      });
    })
    .catch(err => {
      console.log(err);
      this.setState({
        error: "Request failed with status code 404"
      });
    });
  }
  
  render() {
    const { articles, error } = this.state;
    return (
     <React.Fragment>
       <Article data={articles} error={error} />
       <CustomForm
        method="post" 
        btnType="Submit" 
        handleServerError={this.handleServerError} 
        handleServerResponse={this.handleServerResponse}  
        />
     </React.Fragment>
    );
  }
}

export default ArticleList;