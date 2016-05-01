import cookie from 'react-cookie';
import * as ActionType from 'actions/user';
import _ from 'lodash'

let defaultState = {
};

export default function(state = defaultState, action = {}) {
  let cloned
  switch(action.type) {
    case ActionType.USER_LIST_SUCCESS:
      cloned = _.clone(state)
        return  _.merge(cloned, {list: action.response.userList});

    case ActionType.USER_LIST_FAIL:
      cloned = _.clone(state)
      return _.merge(cloned, { code: action.response.code })

    default:
      return state
  }
}
