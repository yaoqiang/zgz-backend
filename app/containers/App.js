import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';

class App extends Component {
  render() {
    const auth = this.props.auth;
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {auth: state.auth};
}

export default connect(mapStateToProps)(App);
