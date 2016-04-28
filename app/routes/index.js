import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from 'store/configureStore';

import cookie from 'react-cookie';

import App from 'containers/App';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';

export default function(history) {
  
  return (
    <Router>
        <Route path="/" component={App} >
        </Route>
    </Router>
  );
};

