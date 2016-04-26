import { CALL_API, CHAIN_API } from 'middleware/api'

export const LOGIN = Symbol('LOGIN')
export const LOGIN_SUCCESS = Symbol('LOGIN')
export const LOGIN_FAIL = Symbol('LOGIN')
export const LOGIN_OUT = Symbol('LOGIN_OUT')

export function login({username, password}) {
  return {
    [CALL_API]: {
      method: 'post',
      path: '/api/auth/login',
      data: {username: username, password: password},
      successType: LOADED_QUESTIONS,
      errorType: LOGIN_FAIL
    }
  }
}

export function logout ({ token }) {
  return {
    [CALL_API]: {
      method: 'post',
      path: '/api/auth/logout',
      successType: LOADED_USER_DETAIL
    }
  }
}
