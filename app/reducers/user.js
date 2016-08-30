import cookie from 'react-cookie';

import * as ActionType from 'actions/user';
import _ from 'lodash'

let defaultState = {
    userList: [],
    offset: 0,
    user: null,
    shopList: null
};

export default function (state = defaultState, action = {}) {
    let cloned

    switch (action.type) {
        case ActionType.USER_LIST_SUCCESS:

            cloned = _.clone(state)
            cloned.userList = action.response.userList;
            cloned.offset = action.response.offset
            cloned.total = action.response.total;
            cloned.limit = action.response.limit;
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
                cloned.rechargeAlertState = 200;
            }
            else {
                cloned.rechargeAlertState = 500;
            }
            return cloned;

        case ActionType.USER_GRANT_SUCCESS:
            cloned = _.clone(state)
            if (action.response.code == 200) {
                cloned.grantAlertState = 200;
            }
            else {
                cloned.grantAlertState = 500;
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
            cloned.rechargeAlertState = null;
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
