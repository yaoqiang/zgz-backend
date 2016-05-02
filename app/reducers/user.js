import cookie from 'react-cookie';

import * as ActionType from 'actions/user';
import _ from 'lodash'

let defaultState = {
    userList: [],
    pageIndex: 1,
    user: null,
    shopList: null
};

export default function (state = defaultState, action = {}) {
    let cloned

    switch (action.type) {
        case ActionType.USER_LIST_SUCCESS:

            cloned = _.clone(state)
            cloned.userList = action.response.userList;
            cloned.pageIndex = action.response.pageIndex
            return cloned;

        case ActionType.USER_LIST_FAIL:
            cloned = _.clone(state)
            return _.merge(cloned, action.response.code)

        case ActionType.USER_GET_SUCCESS:
            cloned = _.clone(state)
            cloned.user = action.response.user;
            return cloned;

        case ActionType.USER_GET_FAIL:
            cloned = _.clone(state)
            return _.merge(cloned, action.response.code)

        case ActionType.USER_RECHARGE_SUCCESS:
            cloned = _.clone(state)
            if (action.response.code == 200) {
                cloned.rechargeState = 200;
            }
            else {
                cloned.rechargeState = 500;
            }
            return cloned;
        case ActionType.SHOP_LIST_SUCCESS:
            cloned = _.clone(state)
            cloned.shopList = action.response.shopList;
            return cloned;
            
        case ActionType.ITEM_LIST_SUCCESS:
            cloned = _.clone(state)
            cloned.itemList = action.response.itemList;
            return cloned;

        case ActionType.UI_USER_DETAIL_DIALOG_CLOSE:
            cloned = _.clone(state)
            cloned.user = null;
            return cloned;

        case ActionType.UI_SHOP_BOX_DIALOG_CLOSE:
            cloned = _.clone(state)
            cloned.shopList = null;
            return cloned;
            
        case ActionType.UI_RECHARGE_ALERT_CLOSE:
            cloned = _.clone(state)
            cloned.rechargeState = null;
            return cloned;
        case ActionType.UI_GRANT_BOX_DIALOG_OPEN:
            cloned = _.clone(state)
            cloned.grantBoxState = 'OPEN';
            return cloned;
        case ActionType.UI_GRANT_BOX_DIALOG_CLOSE:
            cloned = _.clone(state)
            cloned.grantBoxState = null;
            return cloned;
            
        case ActionType.UI_GRANT_ALERT_CLOSE:
            cloned = _.clone(state)
            cloned.grantAlertState = null;
            return cloned;
            
        case ActionType.UI_RECHARGE_PRODUCT_SELECT:
            cloned = _.clone(state)
            cloned.rechargeProductId = action.data.rechargeProductId;
            return cloned;


        default:
            return state
    }
}
