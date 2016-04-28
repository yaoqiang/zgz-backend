import cookie from 'react-cookie';
import * as ActionType from 'actions/auth';
import _ from 'lodash'

let defaultState = {
};

export default function(state = defaultState, action = {}) {
  let cloned
  switch(action.type) {
    case ActionType.LOGIN: 
      cloned = _.clone(state)
      return _.merge(cloned, {LOGIN_LOADING: true});
    case ActionType.LOGIN_SUCCESS:
      cloned = _.clone(state)
    
      if (action.response.token) cookie.save('X-TOKEN', action.response.token);
      return _.merge(cloned, action.response)

    case ActionType.LOGIN_FAIL:
      cloned = _.clone(state)
      return _.merge(cloned, { error: action.response })

    default:
      return state
  }
}
