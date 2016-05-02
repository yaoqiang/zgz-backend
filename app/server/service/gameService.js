import request from 'superagent';

import settings from '../const/settings';


const apiSuffix = process.env.NODE_ENV === 'production' ? settings.gameApiUrl : settings.gameApiUrlDev;

const gameService = {

    getOnlineUserTotal: function (cb) {
        request
            .get(apiSuffix + '/getOnlineUserTotal')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                console.log('getOnlineUserTotal callback -> ', res);
                cb(res.body);
            })
    },

    getOnlineUserByUids: function (data, cb) {
        request
            .get(apiSuffix + '/getOnlineUserByUids?uids=' + data.uids.join(','))
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                console.log('getOnlineUserTotal callback -> ', res);
                cb(res.body);
            })

    },

    payment4OSS: function (data, cb) {
        request
            .post(apiSuffix + '/payment4OSS')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((err, res) => {
                console.log('payment4OSS callback -> ', res);
                cb(res.body);
            })
    },


    addGold: function (data, cb) {
        request
            .post(apiSuffix + '/addGold')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((err, res) => {
                console.log('addGold callback -> ', res);
                cb(res.body);
            })
    },

    addItems: function (data, cb) {
        request
            .post(apiSuffix + '/addItems')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((err, res) => {
                console.log('addItems callback -> ', res);
                cb(res.body);
            })
    },

    addFragment: function (data, cb) {
        request
            .post(apiSuffix + '/addFragment')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((err, res) => {
                console.log('addFragment callback -> ', res);
                cb(res.body);
            })
    },

    getShopList: function (cb) {
        request
            .get(apiSuffix + '/getShopList')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                cb(res.body);
            })
    },

    getItemList: function (cb) {
        request
            .get(apiSuffix + '/getItemList')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                console.log('getItemList callback -> ', res);
                cb(res.body);
            })
    },

    getExchangeListNew: function (cb) {
        request
            .get(apiSuffix + '/getExchangeListNew')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                console.log('getExchangeListNew callback -> ', res);
                cb(res.body);
            })
    },

    getMyExchangeRecordList: function (params) {

    },

    /**
     * @param data: {type: xx}
     */
    getRankingList: function (data, cb) {
        request
            .get(apiSuffix + '/getRankingList?type=' + data.type)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                console.log('getRankingList callback -> ', res);
                cb(res.body);
            })
    },

    /**
     * @param data: {content: String}
     */
    sendBBS: function (data, cb) {
        request
            .post(apiSuffix + '/sendBBS')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((err, res) => {
                console.log('sendBBS callback -> ', res);
                cb(res.body);
            })
    }

}

export default gameService;