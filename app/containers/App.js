import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from 'components/Header';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();


class App extends Component {
  
  componentWillMount() {
    
  }
  
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

export default connect(mapStateToProps)(themeDecorator(getMuiTheme(null, {userAgent: 'all' }))(App));
