import { CALL_API, CHAIN_API } from 'middleware/api'

export const SEND_BBS_SUCCESS = Symbol('SEND_BBS_SUCCESS')
export const SEND_BBS_FAIL = Symbol('SEND_BBS_FAIL')

export function sendBBS(content) {
  return {
    [CALL_API]: {
      method: 'post',
      path: '/api/game/sendBBS',
      data: {content: content},
      successType: SEND_BBS_SUCCESS,
      errorType: SEND_BBS_FAIL
    }
  }
}
