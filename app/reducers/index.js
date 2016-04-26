import { combineReducers } from 'redux';
import questions from 'reducers/questions';
import questionDetail from 'reducers/questionDetail';

import auth from 'reducers/auth';

const rootReducer = combineReducers({
  questions,
  questionDetail,
  auth
});

export default rootReducer;
