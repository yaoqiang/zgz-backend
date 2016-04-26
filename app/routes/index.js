import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from 'store/configureStore';

import App from 'containers/App';
import Login from 'containers/Login';
import Questions from 'containers/Questions';
import Question from 'containers/Question';

export default function(store) {
  
  return (
    <Router path="/" component={App}>
      <Route onEnter={requireAuth}>
        <Route path="questions" component={Questions} />
        <Route path="questions/:id" component={Question} />
      </Route>
      <IndexRoute component={Login} />
    </Router>
  );
};


function requireAuth() {
  if (cookie.load('token')) {
    return true;
  }
  window.location = '/login';
}
