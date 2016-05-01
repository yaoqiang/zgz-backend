import mongojs from 'mongojs';

export function authenticationAccount(req, res, next){
    // if(req.headers['X-TOKEN'] && req.headers['X-TOKEN'] === 'admin'){
    //   //validation
    //     next();
    // }
    // else
    // {
    //     next(401);
    // }
    next();
}

export function authenticationIpAddress(req, res, next) {

}

export function authenticationPermissions(req, res, next) {

}