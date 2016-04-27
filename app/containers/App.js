import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';

class App extends Component {
  render() {
    const isLogin = requireAuth();
    console.log(isLogin);
    return (
      <div>
        {isLogin &&
          <Dashboard />
        }
        
        {!isLogin &&
          <Login />
        }
       
      </div>
    );
  }
}

function requireAuth() {
  if (cookie.load('X-TOKEN')) {
    return true;
  }
  return false;
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);
