import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
import * as AuthActions from '../actions/auth';

class LoginContainer extends Component {

  componentDidMount() {
  }
  render() {
    return (
      <div>
        <h2>Login</h2>
        <Login />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { auth: state.auth || {}}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch);
}

export { LoginContainer }
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
