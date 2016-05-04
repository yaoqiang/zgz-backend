import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from 'store/configureStore';

import { browserHistory } from 'react-router'

import cookie from 'react-cookie';


import App from 'containers/App';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';
import User from 'containers/User';
import Order from 'containers/Order';

	
function requireAuth() {
	return true;
}

export default function(history) {

  
  return (
    <Router history={browserHistory}>
	     <Route path="/" component={App} onEnter={requireAuth}>
	        <IndexRoute component={Dashboard} />
					<Route path="user" component={User} />
					<Route path="order" component={Order} />
		  </Route>
	   </Router>
  );
};
