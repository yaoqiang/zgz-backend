import { CALL_API, CHAIN_API, UI } from 'middleware/api'

export const USER_LIST = Symbol('USER_LIST')
export const USER_LIST_SUCCESS = Symbol('USER_LIST_SUCCESS')
export const USER_LIST_FAIL = Symbol('USER_LIST_FAIL')

export const USER_GET = Symbol('USER_GET')
export const USER_GET_SUCCESS = Symbol('USER_GET_SUCCESS')
export const USER_GET_FAIL = Symbol('USER_GET_FAIL')

export const USER_RECHARGE = Symbol('USER_RECHARGE')
export const USER_RECHARGE_SUCCESS = Symbol('USER_RECHARGE_SUCCESS')
export const USER_RECHARGE_FAIL = Symbol('USER_RECHARGE_FAIL')

export const USER_GRANT = Symbol('USER_GRANT')
export const USER_GRANT_SUCCESS = Symbol('USER_GRANT_SUCCESS')
export const USER_GRANT_FAIL = Symbol('USER_GRANT_FAIL')

export const USER_LOG_LOGIN_RECORD = Symbol('USER_LOG_LOGIN_RECORD')
export const USER_LOG_LOGIN_RECORD_SUCCESS = Symbol('USER_LOG_LOGIN_RECORD_SUCCESS')
export const USER_LOG_LOGIN_RECORD_FAIL = Symbol('USER_LOG_LOGIN_RECORD_FAIL')

export const USER_LOG_USER_RECORD = Symbol('USER_LOG_USER_RECORD')
export const USER_LOG_USER_RECORD_SUCCESS = Symbol('USER_LOG_USER_RECORD_SUCCESS')
export const USER_LOG_USER_RECORD_FAIL = Symbol('USER_LOG_USER_RECORD_FAIL')

export const USER_LOG_PAYMENT_RECORD = Symbol('USER_LOG_PAYMENT_RECORD')
export const USER_LOG_PAYMENT_RECORD_SUCCESS = Symbol('USER_LOG_PAYMENT_RECORD_SUCCESS')
export const USER_LOG_PAYMENT_RECORD_FAIL = Symbol('USER_LOG_PAYMENT_RECORD_FAIL')


//UI actions
export const UI_USER_DETAIL_DIALOG_CLOSE = Symbol('UI_USER_DETAIL_DIALOG_CLOSE')



export function list(uid, mobile, pageIndex) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/user/list?uid='+uid+'&mobile='+mobile+'&pageIndex='+pageIndex,
      successType: USER_LIST_SUCCESS,
      errorType: USER_LIST_FAIL
    }
  }
}

export function get(uid) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/user/${uid}',
      successType: USER_GET_SUCCESS,
      errorType: USER_GET_FAIL
    }
  }
}

export function recharge(data) {
  return {
    [CALL_API]: {
      method: 'post',
      path: '/api/user/recharge',
      data: data,
      successType: USER_RECHARGE_SUCCESS,
      errorType: USER_RECHARGE_FAIL
    }
  }
}

export function grant(data) {
  return {
    [CALL_API]: {
      method: 'post',
      path: '/api/user/grant',
      data: data,
      successType: USER_GRANT_SUCCESS,
      errorType: USER_GRANT_FAIL
    }
  }
}

export function getLogLoginRecord(uid) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/user/getLogLoginRecord?uid=',
      successType: USER_LOG_LOGIN_RECORD_SUCCESS,
      errorType: USER_LOG_LOGIN_RECORD_FAIL
    }
  }
}


export function getLogUserRecord(uid) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/user/getLogUserRecord?uid=',
      successType: USER_LOG_USER_RECORD_SUCCESS,
      errorType: USER_LOG_USER_RECORD_FAIL
    }
  }
}

export function getLogPaymentRecord(uid) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/user/getLogPaymentRecord?uid=',
      successType: USER_LOG_PAYMENT_RECORD_SUCCESS,
      errorType: USER_LOG_PAYMENT_RECORD_FAIL
    }
  }
}


//UI actions
export function closeUserDetailDialog() {
  return {
    [UI]: {
      type: UI_USER_DETAIL_DIALOG_CLOSE
    }
  }
}
