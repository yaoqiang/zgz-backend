import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from 'components/Header';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


class App extends Component {
  render() {
    const auth = this.props.auth;
    return (
      <div>
      	{!auth.loggedIn && <Login />}
        {auth.loggedIn && 
          <Header />
        }
        {auth.loggedIn && 
          this.props.children
        }
        
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {auth: state.auth};
}

export default connect(mapStateToProps)(App);
