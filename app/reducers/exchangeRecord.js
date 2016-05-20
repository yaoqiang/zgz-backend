import cookie from 'react-cookie';

import * as ActionType from 'actions/exchangeRecord';
import _ from 'lodash'

let defaultState = {
    exchangeRecordList: [],
    offset: 0,
    total: 0,
    exchangeRecordDetail: null,
};

export default function (state = defaultState, action = {}) {
    let cloned

    switch (action.type) {
        case ActionType.EXCHANGE_RECORD_LIST_SUCCESS:

            cloned = _.clone(state)
            cloned.exchangeRecordList = action.response.exchangeRecordList;
            cloned.offset = action.response.offset;
            cloned.total = action.response.total;
            cloned.limit = action.response.limit;
            return cloned;

        case ActionType.EXCHANGE_RECORD_LIST_FAIL:
            cloned = _.clone(state)
            return _.merge(cloned, action.response.code)

        case ActionType.EXCHANGE_RECORD_GET_SUCCESS:
            cloned = _.clone(state)
            cloned.exchangeRecordDetail = action.response.exchangeRecordDetail;
            return cloned;

        case ActionType.EXCHANGE_RECORD_GET_FAIL:
            cloned = _.clone(state)
            return _.merge(cloned, action.response.code)
        default:
            return state;
    }
}