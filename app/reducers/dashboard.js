import cookie from 'react-cookie';
import * as ActionType from 'actions/dashboard';
import _ from 'lodash'

let defaultState = {
};

export default function (state = defaultState, action = {}) {
    let cloned
    switch (action.type) {
        case ActionType.DASHBOARD_ACQUISITION_SUCCESS:
            cloned = _.clone(state)
            return _.merge(cloned, action.response)
        case ActionType.DASHBOARD_ACQUISITION_LAST_DAY_SUCCESS:
            cloned = _.clone(state)
            return _.merge(cloned, action.response)
        case ActionType.DASHBOARD_ACQUISITION_LAST_WEEK_SUCCESS:
            cloned = _.clone(state)
            return _.merge(cloned, action.response)
        case ActionType.DASHBOARD_ACQUISITION_LAST_TWO_WEEK_SUCCESS:
            cloned = _.clone(state)
            return _.merge(cloned, action.response)
        case ActionType.DASHBOARD_ACQUISITION_LAST_MONTH_SUCCESS:
            cloned = _.clone(state)
            return _.merge(cloned, action.response)
        case ActionType.DASHBOARD_ACTIVATION_LAST_DAY_SUCCESS:
            cloned = _.clone(state)
            return _.merge(cloned, action.response)
        case ActionType.DASHBOARD_ACTIVATION_LAST_WEEK_SUCCESS:
            cloned = _.clone(state)
            return _.merge(cloned, action.response)
        case ActionType.DASHBOARD_ACTIVATION_LAST_TWO_WEEK_SUCCESS:
            cloned = _.clone(state)
            return _.merge(cloned, action.response)
        case ActionType.DASHBOARD_ACTIVATION_LAST_MONTH_SUCCESS:
            cloned = _.clone(state)
            return _.merge(cloned, action.response)
        default:
            return state
    }
}
