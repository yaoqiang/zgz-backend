import { CALL_API, CHAIN_API } from 'middleware/api'

export const EXCHANGE_RECORD_LIST = Symbol('EXCHANGE_RECORD_LIST')
export const EXCHANGE_RECORD_LIST_SUCCESS = Symbol('EXCHANGE_RECORD_LIST_SUCCESS')
export const EXCHANGE_RECORD_LIST_FAIL = Symbol('EXCHANGE_RECORD_LIST_FAIL')

export const EXCHANGE_RECORD_GET = Symbol('EXCHANGE_RECORD_GET')
export const EXCHANGE_RECORD_GET_SUCCESS = Symbol('EXCHANGE_RECORD_GET_SUCCESS')
export const EXCHANGE_RECORD_GET_FAIL = Symbol('EXCHANGE_RECORD_GET_FAIL')

//------------
//UI actions
//------------

//关闭用户详情窗口
export const UI_EXCHANGE_RECORD_DETAIL_DIALOG_CLOSE = Symbol('UI_EXCHANGE_RECORD_DETAIL_DIALOG_CLOSE')



export function list(uid, mobile, state, offset) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/exchange/record/list?uid='+uid+'&mobile='+mobile+'&state='+state+'&offset='+offset,
      successType: EXCHANGE_RECORD_LIST_SUCCESS,
      errorType: EXCHANGE_RECORD_LIST_FAIL
    }
  }
}

export function get(id) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/exchange/record/'+id,
      successType: EXCHANGE_RECORD_GET_SUCCESS,
      errorType: EXCHANGE_RECORD_GET_FAIL
    }
  }
}


//UI actions
export function closeExchangeRecordDetailDialog() {
  return {
    [UI]: {
      type: UI_EXCHANGE_RECORD_DETAIL_DIALOG_CLOSE
    }
  }
}