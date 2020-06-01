import React from 'react';
import axios from 'axios';
import { Card, Alert, Form, Button } from 'antd';
import CustomForm from '../components/Form';


class ArticleDetail extends React.Component {
  state = {
    article: {},
    visible: true,
    error: null,
  }

  handleClose = () => {
    this.setState({
      visible: false
    });
  };

  handleServerResponse = newData => {
    let article = {...this.state.article};
    article =  newData;
    this.setState({article});
  }

  handleServerError = errorMsg => {
    this.setState({
      error: errorMsg
    });
  }

  handleDelete = () => {
    axios.delete(`https://django-react-fullapp.herokuapp.com/api/articles/${this.articleID}/`);
    this.props.history.push("/")
  }
  

  articleID = this.props.match.params.articleID;

  componentDidMount() {
    axios.get(`https://django-react-fullapp.herokuapp.com/api/articles/${this.articleID}/`)
    .then(res => {
      this.setState({
        article: res.data
      })
    })
    .catch(err => {
      console.log(err);
      this.setState({
        error: "Request failed with status code 404"
      });
    });
  }

  render() {
    const { article, visible, error } = this.state;
    return (
     <React.Fragment>
      <div>
      {visible && error ? (
        <Alert message={error} type="error" closable afterClose={this.handleClose} />
      ) : null}
      </div>
       <Card title={article.title}>
        <p>{article.description}</p>
        <div>{article.content}</div>
       </Card>
       <CustomForm 
         method="put" 
         articleID={this.articleID}
         btnType="Update" 
         handleServerError={this.handleServerError} 
         handleServerResponse={this.handleServerResponse}
       />
       <Form onFinish={this.handleDelete}>
         <Form.Item>
           <Button type="danger" htmlType="submit">Delete</Button>
         </Form.Item>
       </Form>
     </React.Fragment>
    );
  }
}

export default ArticleDetail;