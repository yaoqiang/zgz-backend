import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from 'store/configureStore';

import { browserHistory } from 'react-router'

import cookie from 'react-cookie';

import NotFound from 'components/NotFound';
import App from 'containers/App';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';
import User from 'containers/User';
import Order from 'containers/Order';
import ExchangeRecord from 'containers/ExchangeRecord';

import BBS from 'containers/BBS';

export default function(history) {
  
  return (
    <Router history={browserHistory}>
	     <Route path="/" component={App} >
	        <IndexRoute component={Dashboard} />
					<Route path="user" component={User} />
					<Route path="order" component={Order} />
					<Route path="exchange/record" component={ExchangeRecord} />
					<Route path="game/bbs" component={BBS} />
					
					<Route path="*" component={NotFound}/>
		  </Route>
	   </Router>
  );
};
