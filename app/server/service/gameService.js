import request from 'superagent';

export default gameService = {
    
    getOnlineUserTotal: function (params) {
        
    },
    
    getOnlineUserByUids: function (params) {
        
        
    },
    
    payment4OSS: function (params) {
        
    },
    
    
    addGold: function (params) {
        
    },
    
    addItems: function (data, cb) {
        request
        .post('/addItems')
        .set('Content-Type', 'application/json')
        .send(params)
        .end((err, res) => {
            console.log('addItems callback -> ', res);
            cb(res);
        })
    },
    
    addFragment: function (params) {
        
    },
    
    getShopList: function (params) {
        
    },
    
    getItemList: function (params) {
        
    },
    
    getExchangeListNew: function (params) {
        
    },
    
    getMyExchangeRecordList: function (params) {
        
    },
    
    getRankingList: function (params) {
        
    },
    
    sendBBS: function (params) {
        
    }
    
}
