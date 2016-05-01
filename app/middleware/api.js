import superAgent from 'superagent'
import Promise, { using } from 'bluebird'
import _ from 'lodash'
import config from 'config'

export const CALL_API = Symbol('CALL_API')
export const CHAIN_API = Symbol('CHAIN_API')
export const UI = Symbol('UI')

export default ({ dispatch, getState }) => next => action => {
  if (action[CALL_API]) {
    return dispatch({
      [CHAIN_API]: [
        ()=> action
      ]
    })
  }

  let deferred = Promise.defer()

  if (! action[CHAIN_API]) {
    
    if (action[UI]) {
      return dispatch(action[UI]);
    }
    return next(action);
  }

  let promiseCreators = action[CHAIN_API].map((apiActionCreator)=> {
    return createRequestPromise(apiActionCreator, next, getState, dispatch)
  })

  let overall = promiseCreators.reduce((promise, creator)=> {
    return promise.then((body)=> {
      return creator(body)
    })
  }, Promise.resolve())

  overall.finally(()=> {
    deferred.resolve()
  }).catch((e)=> {
    console.log(e)
  })

  return deferred.promise
}

function createRequestPromise (apiActionCreator, next, getState, dispatch) {
  return (prevBody)=> {
    let apiAction = apiActionCreator(prevBody)
    let deferred = Promise.defer()
    let params = extractParams(apiAction[CALL_API])
    superAgent[params.method](params.url)
      .set('Content-Type', 'application/json')
      .send(params.data)
      .end((err, res)=> {
        if (err) {
          if ( params.errorType ) {
            dispatch({
              type: params.errorType,
              error: err
            })
          }

          if (_.isFunction(params.afterError)) {
            params.afterError({ getState })
          }
          deferred.reject()
        } else {
          dispatch({
            type: params.successType,
            response: res.body
          })

          if (_.isFunction(params.afterSuccess)) {
            params.afterSuccess({ getState })
          }
          deferred.resolve(res.body)
        }
      })

    return deferred.promise
  }

}

function extractParams (callApi) {
  let { method, path, data, successType, errorType, afterSuccess, afterError } = callApi
  let url = `${config.API_BASE_URL}${path}`

  return {
    method,
    url,
    data,
    successType,
    errorType,
    afterSuccess,
    afterError
  }
}
