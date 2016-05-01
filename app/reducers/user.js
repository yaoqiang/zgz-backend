import cookie from 'react-cookie';
import * as ActionType from 'actions/user';
import _ from 'lodash'

let defaultState = {
    list: [],
    pageIndex: 1,
    user: null
};

export default function(state = defaultState, action = {}) {
  let cloned
  
  switch(action.type) {
    case ActionType.USER_LIST_SUCCESS:
      cloned = _.clone(state)
      cloned.list = action.response.userList;
      cloned.pageIndex = action.response.pageIndex
        return  cloned;

    case ActionType.USER_LIST_FAIL:
      cloned = _.clone(state)
      return _.merge(cloned, action.response.code)
      
      case ActionType.USER_GET_SUCCESS:
      cloned = _.clone(state)
      cloned.user = action.response.user;
        return  cloned;

    case ActionType.USER_GET_FAIL:
      cloned = _.clone(state)
      return _.merge(cloned, action.response.code)
      
    case ActionType.UI_USER_DETAIL_DIALOG_CLOSE:
        cloned = _.clone(state)
        cloned.user = null;
        return cloned;

    default:
      return state
  }
}
