import { CALL_API, CHAIN_API } from 'middleware/api'

export const LOADED_QUELOADED_USER_LISTSTIONS = Symbol('LOADED_USER_LIST')
export function loadUserList({id, mobile}) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/user/list?',
      successType: LOADED_QUESTIONS
    }
  }
}

export const LOADED_USER_DETAIL = Symbol('LOADED_USER_DETAIL')
export function loadUserDetail ({ id }) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/user/${id}',
      successType: LOADED_USER_DETAIL
    }
  }
}
