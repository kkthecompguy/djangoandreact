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


const Signup = props => {
  const [ visible, setVisible ] = useState(true);

  const onFinish = values => {
    props.onAuth(values.username, values.email, values.password, values.confirm)
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
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your email!',
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

          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
            ]}
          >
          <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Signup
            </Button> Or 
            <NavLink to="/login"> login</NavLink>
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
    onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);