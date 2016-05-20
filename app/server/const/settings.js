const settings = {
    mongodbUrlDev: 'mongodb://127.0.0.1:27017/zgz',
    gameApiUrlDev: 'http://127.0.0.1:1337/api/game',
    
    // mongodbUrlDev: 'mongodb://101.200.128:27017/zgz',
    // gameApiUrlDev: 'http://101.200.128.237:1337/api/game',

    mongodbUrl: 'mongodb://101.201.154.38:27017/zgz',
    gameApiUrl: 'http://101.201.154.38:1337/api/game',

    secret: "zgz_session_secret",

    page: {
        limit: 15,
        offset: 0
    }
}

export default settings;