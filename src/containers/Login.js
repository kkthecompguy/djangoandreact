import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button, Spin, Alert} from 'antd';
import { NavLink } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import * as actions from '../store/actions/auth'

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const Login = props => {
  const [ visible, setVisible ] = useState(true);

  const onFinish = values => {
    props.onAuth(values.username, values.password)
    props.history.push('/')
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleClose = () => {
    setVisible(false)
  };

  return (
    <div className="container">
      {visible && props.error ? 
        <Alert message={props.error.message} type="error" closable afterClose={handleClose} />
        : null
      }

      {
        props.loading ? 
        <Spin indicator={antIcon} /> :
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Login
            </Button> Or 
            <NavLink to="/signup"> signUp</NavLink>
          </Form.Item>
        </Form>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(actions.authLogin(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);