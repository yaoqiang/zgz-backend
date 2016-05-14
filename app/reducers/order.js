import cookie from 'react-cookie';

import * as ActionType from 'actions/order';
import _ from 'lodash'

let defaultState = {
    orderList: [],
    pageIndex: 1,
    total: 0,
    orderDetail: null,
};

export default function (state = defaultState, action = {}) {
    let cloned

    switch (action.type) {
        case ActionType.ORDER_LIST_SUCCESS:

            cloned = _.clone(state)
            cloned.orderList = action.response.orderList;
            cloned.pageIndex = action.response.pageIndex;
            cloned.total = action.response.total;
            return cloned;

        case ActionType.ORDER_LIST_FAIL:
            cloned = _.clone(state)
            return _.merge(cloned, action.response.code)

        case ActionType.ORDER_GET_SUCCESS:
            cloned = _.clone(state)
            cloned.orderDetail = action.response.orderDetail;
            return cloned;

        case ActionType.ORDER_GET_FAIL:
            cloned = _.clone(state)
            return _.merge(cloned, action.response.code)
        default:
            return state;
    }
}