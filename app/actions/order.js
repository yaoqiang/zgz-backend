import { CALL_API, CHAIN_API } from 'middleware/api'

export const ORDER_LIST = Symbol('ORDER_LIST')
export const ORDER_LIST_SUCCESS = Symbol('ORDER_LIST_SUCCESS')
export const ORDER_LIST_FAIL = Symbol('ORDER_LIST_FAIL')

export const ORDER_GET = Symbol('ORDER_GET')
export const ORDER_GET_SUCCESS = Symbol('ORDER_GET_SUCCESS')
export const ORDER_GET_FAIL = Symbol('ORDER_GET_FAIL')

//------------
//UI actions
//------------

//关闭用户详情窗口
export const UI_ORDER_DETAIL_DIALOG_CLOSE = Symbol('UI_ORDER_DETAIL_DIALOG_CLOSE')



export function list(uid, mobile, state, device, offset) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/order/list?uid='+uid+'&mobile='+mobile+'&state='+state+'&device='+device+'&offset='+offset,
      successType: ORDER_LIST_SUCCESS,
      errorType: ORDER_LIST_FAIL
    }
  }
}

export function get(id) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/order/'+id,
      successType: ORDER_GET_SUCCESS,
      errorType: ORDER_GET_FAIL
    }
  }
}


//UI actions
export function closeOrderDetailDialog() {
  return {
    [UI]: {
      type: UI_ORDER_DETAIL_DIALOG_CLOSE
    }
  }
}