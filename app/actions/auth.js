import { CALL_API, CHAIN_API } from 'middleware/api'

export const LOGIN = Symbol('LOGIN')
export const LOGIN_SUCCESS = Symbol('LOGIN_SUCCESS')
export const LOGIN_FAIL = Symbol('LOGIN_FAIL')
export const LOGIN_OUT = Symbol('LOGIN_OUT')

export function login(username, password) {
    console.log('action login...', username, password)
  return {
    [CALL_API]: {
      method: 'post',
      path: '/api/auth/login',
      data: {username: username, password: password},
      successType: LOGIN_SUCCESS,
      errorType: LOGIN_FAIL
    }
  }
}

export function logout ({ token }) {
  return {
    [CALL_API]: {
      method: 'post',
      path: '/api/auth/logout',
      successType: LOGIN_OUT
    }
  }
}
