import React from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';


class CustomForm extends React.Component {
  formRef = React.createRef();

  handleFormSubmit = e => {
    e.preventDefault();
    const data = {
      title: e.target.elements.title.value,
      description: e.target.elements.description.value,
      content: e.target.elements.content.value,
    }

    const { method, articleID } = this.props;

    switch (method) {
      case "post":
        axios.post("https://django-react-fullapp.herokuapp.com/api/articles/", data)
        .then(res => {
          this.props.handleServerResponse(res.data);
        })
        .catch(err => {
          if (err) {
            console.log(err);
            this.props.handleServerError("Request Failed with status code 403");
          } else {
            this.props.handleServerError(null);
          }
        });
        break;
      case "put":
        axios.put(`https://django-react-fullapp.herokuapp.com/api/articles/${articleID}/`, data)
        .then(res => {
          this.props.handleServerResponse(res.data);
        })
        .catch(err => {
          if (err) {
            console.log(err);
            this.props.handleServerError("Request Failed with status code 403");
          } else {
            this.props.handleServerError(null);
          }
        })
        break;
      default:
        break;
    }
    this.onReset(e);
  }

  onReset = (e) => {
    e.target.elements.title.value = "";
    e.target.elements.content.value = "";
    e.target.elements.description.value = "";
  };

  render() {
    return (
      <React.Fragment>
        <Form ref={this.formRef} name="control-ref" onSubmitCapture={this.handleFormSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input ref={this.titleRef} name="title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input name="description" />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input name="content" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {this.props.btnType}
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}

export default CustomForm;