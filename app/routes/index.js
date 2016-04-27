import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from 'store/configureStore';

import App from 'containers/App';
import Dashboard from 'containers/Dashboard';
import Questions from 'containers/Questions';
import Question from 'containers/Question';

export default function(history) {
  
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
      </Route>
    </Router>
  );
};



