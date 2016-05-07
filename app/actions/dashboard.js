import { CALL_API, CHAIN_API } from 'middleware/api'

export const DASHBOARD_ACQUISITION_SUCCESS = Symbol('DASHBOARD_ACQUISITION_SUCCESS')
export const DASHBOARD_ACQUISITION_FAIL = Symbol('DASHBOARD_ACQUISITION_FAIL')
export const DASHBOARD_ACQUISITION_LAST_DAY_SUCCESS = Symbol('DASHBOARD_ACQUISITION_LAST_DAY_SUCCESS')
export const DASHBOARD_ACQUISITION_LAST_DAY_FAIL = Symbol('DASHBOARD_ACQUISITION_LAST_DAY_FAIL')
export const DASHBOARD_ACQUISITION_LAST_WEEK_SUCCESS = Symbol('DASHBOARD_ACQUISITION_LAST_WEEK_SUCCESS')
export const DASHBOARD_ACQUISITION_LAST_WEEK_FAIL = Symbol('DASHBOARD_ACQUISITION_LAST_WEEK_FAIL')
export const DASHBOARD_ACQUISITION_LAST_TWO_WEEK_SUCCESS = Symbol('DASHBOARD_ACQUISITION_LAST_TWO_WEEK_SUCCESS')
export const DASHBOARD_ACQUISITION_LAST_TWO_WEEK_FAIL = Symbol('DASHBOARD_ACQUISITION_LAST_TWO_WEEK_FAIL')
export const DASHBOARD_ACQUISITION_LAST_MONTH_SUCCESS = Symbol('DASHBOARD_ACQUISITION_LAST_MONTH_SUCCESS')
export const DASHBOARD_ACQUISITION_LAST_MONTH_FAIL = Symbol('DASHBOARD_FAIL')

export const DASHBOARD_ACTIVATION_LAST_DAY_SUCCESS = Symbol('DASHBOARD_ACTIVATION_LAST_DAY_SUCCESS')
export const DASHBOARD_ACTIVATION_LAST_DAY_FAIL = Symbol('DASHBOARD_ACTIVATION_LAST_DAY_FAIL')
export const DASHBOARD_ACTIVATION_LAST_WEEK_SUCCESS = Symbol('DASHBOARD_ACTIVATION_LAST_WEEK_SUCCESS')
export const DASHBOARD_ACTIVATION_LAST_WEEK_FAIL = Symbol('DASHBOARD_ACTIVATION_LAST_WEEK_FAIL')
export const DASHBOARD_ACTIVATION_LAST_TWO_WEEK_SUCCESS = Symbol('DASHBOARD_ACTIVATION_LAST_TWO_WEEK_SUCCESS')
export const DASHBOARD_ACTIVATION_LAST_TWO_WEEK_FAIL = Symbol('DASHBOARD_ACTIVATION_LAST_TWO_WEEK_FAIL')
export const DASHBOARD_ACTIVATION_LAST_MONTH_SUCCESS = Symbol('DASHBOARD_ACTIVATION_LAST_MONTH_SUCCESS')
export const DASHBOARD_ACTIVATION_LAST_MONTH_FAIL = Symbol('DASHBOARD_ACTIVATION_LAST_MONTH_FAIL')



export function dashboard() {
    return {
        [CHAIN_API]: [
            () => {
                return {
                    [CALL_API]: {
                        method: 'get',
                        path: '/api/dashboard/acquisition',
                        successType: DASHBOARD_ACQUISITION_SUCCESS,
                        errorType: DASHBOARD_ACQUISITION_FAIL
                    }
                }
            },
            () => {
                return {
                    [CALL_API]: {
                        method: 'get',
                        path: '/api/dashboard/acquisitionLastDay',
                        successType: DASHBOARD_ACQUISITION_LAST_DAY_SUCCESS,
                        errorType: DASHBOARD_ACQUISITION_LAST_DAY_FAIL
                    }
                }
            }, () => {
                return {
                    [CALL_API]: {
                        method: 'get',
                        path: '/api/dashboard/acquisitionLastWeek',
                        successType: DASHBOARD_ACQUISITION_LAST_WEEK_SUCCESS,
                        errorType: DASHBOARD_ACQUISITION_LAST_WEEK_FAIL
                    }
                }
            }, () => {
                return {
                    [CALL_API]: {
                        method: 'get',
                        path: '/api/dashboard/acquisitionLastTwoWeek',
                        successType: DASHBOARD_ACQUISITION_LAST_TWO_WEEK_SUCCESS,
                        errorType: DASHBOARD_ACQUISITION_LAST_TWO_WEEK_FAIL
                    }
                }
            }, () => {
                return {
                    [CALL_API]: {
                        method: 'get',
                        path: '/api/dashboard/acquisitionLastMonth',
                        successType: DASHBOARD_ACQUISITION_LAST_MONTH_SUCCESS,
                        errorType: DASHBOARD_ACQUISITION_LAST_MONTH_FAIL
                    }
                }
            }, () => {
                return {
                    [CALL_API]: {
                        method: 'get',
                        path: '/api/dashboard/activationLastDay',
                        successType: DASHBOARD_ACTIVATION_LAST_DAY_SUCCESS,
                        errorType: DASHBOARD_ACTIVATION_LAST_DAY_FAIL
                    }
                }
            }, () => {
                return {
                    [CALL_API]: {
                        method: 'get',
                        path: '/api/dashboard/activationLastWeek',
                        successType: DASHBOARD_ACTIVATION_LAST_WEEK_SUCCESS,
                        errorType: DASHBOARD_ACTIVATION_LAST_WEEK_FAIL
                    }
                }
            }, () => {
                return {
                    [CALL_API]: {
                        method: 'get',
                        path: '/api/dashboard/activationLastTwoWeek',
                        successType: DASHBOARD_ACTIVATION_LAST_TWO_WEEK_SUCCESS,
                        errorType: DASHBOARD_ACTIVATION_LAST_TWO_WEEK_FAIL
                    }
                }
            }, () => {
                return {
                    [CALL_API]: {
                        method: 'get',
                        path: '/api/dashboard/activationLastMonth',
                        successType: DASHBOARD_ACTIVATION_LAST_MONTH_SUCCESS,
                        errorType: DASHBOARD_ACTIVATION_LAST_MONTH_FAIL
                    }
                }
            }]
    }
}
