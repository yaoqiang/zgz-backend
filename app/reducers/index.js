import { combineReducers } from 'redux';

import auth from 'reducers/auth';
import dashboard from 'reducers/dashboard';
import user from 'reducers/user';
import order from 'reducers/order';

const rootReducer = combineReducers({
  auth,
  dashboard,
  user,
  order
});

export default rootReducer;
