import { combineReducers } from 'redux';

import auth from 'reducers/auth';
import dashboard from 'reducers/dashboard';
import user from 'reducers/user';

const rootReducer = combineReducers({
  auth,
  dashboard,
  user
});

export default rootReducer;
