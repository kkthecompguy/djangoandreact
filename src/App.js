import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux'
import 'antd/dist/antd.css';
import CustomLayout from './containers/Layout';
import BaseRouter from './Routes';
import * as actions from './store/actions/auth';

class App extends React.Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  
  render() {
    return (
      <React.Fragment>
      <Router>
        <CustomLayout {...this.props}>
            <BaseRouter />
        </CustomLayout>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToprops = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(App);