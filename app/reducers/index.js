import { combineReducers } from 'redux';

import auth from 'reducers/auth';
import user from 'reducers/user';

const rootReducer = combineReducers({
  auth,
  user
});

export default rootReducer;
