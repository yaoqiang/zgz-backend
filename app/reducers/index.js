import { combineReducers } from 'redux';

import auth from 'reducers/auth';
import dashboard from 'reducers/dashboard';
import user from 'reducers/user';
import order from 'reducers/order';
import exchangeRecord from 'reducers/exchangeRecord';

const rootReducer = combineReducers({
  auth,
  dashboard,
  user,
  order,
  exchangeRecord
});

export default rootReducer;
