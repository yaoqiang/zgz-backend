import * as ActionType from 'actions/questions';

function questionsReducer (state = [], action) {
  switch(action.type) {
    case ActionType.LOADED_QUESTIONS:
      return action.response;
    default:
      return state;
  }
}

export default questionsReducer;
