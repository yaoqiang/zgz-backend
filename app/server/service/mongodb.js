import mongojs from 'mongojs';

import settings from '../const/settings';

const mongodbUrl = process.env.NODE_ENV === 'production' ? settings.mongodbUrl : settings.mongodbUrlDev;

export const db = mongojs(mongodbUrl,
    ['user', 'player', 'gameRecord', 'exchangeList', 'exchangeRecord', 'rankingList',
        'appReleaseRecord', 'onlineUserAnalysis', 'order', 'captcha', 'systemMessage', 'serialCode',
        'appleSetting', 'account', 'grantRecord',
        'logLoginRecord', 'logGameRecord', 'logPaymentRecord', 'logUserRecord', 'logOnlineRecord'
    ]);

//index
db.account.ensureIndex({ username: 1 });

db.logLoginRecord.ensureIndex({ createdAt: 1 });
db.logLoginRecord.ensureIndex({ uid: 1 });
db.logLoginRecord.ensureIndex({ ip: 1 });
db.logLoginRecord.ensureIndex({ uid: 1, createdAt: 1 });
db.logLoginRecord.ensureIndex({ uid: 1, createdAt: 1, ip: 1 });

db.logGameRecord.ensureIndex({ createdAt: 1 });
db.logGameRecord.ensureIndex({ lobby: 1 });
db.logGameRecord.ensureIndex({ roomId: 1 });
db.logGameRecord.ensureIndex({ meeting: 1 });
db.logGameRecord.ensureIndex({ lobby: 1, roomId: 1, createdAt: 1 });
db.logGameRecord.ensureIndex({ lobby: 1, roomId: 1, meeting: 1, createdAt: 1 });

db.logOnlineRecord.ensureIndex({ createdAt: 1 });
db.logOnlineRecord.ensureIndex({ 'data.total': 1 });


db.logUserRecord.ensureIndex({ createdAt: 1 });
db.logUserRecord.ensureIndex({ uid: 1 });
db.logUserRecord.ensureIndex({ type: 1 });
db.logUserRecord.ensureIndex({ uid: 1, createdAt: 1 });
db.logUserRecord.ensureIndex({ uid: 1, createdAt: 1, type: 1, action: 1, 'detail.type': 1 });

db.logPaymentRecord.ensureIndex({ createdAt: 1 });
db.logPaymentRecord.ensureIndex({ uid: 1 });
db.logPaymentRecord.ensureIndex({ type: 1 });
db.logPaymentRecord.ensureIndex({ uid: 1, createdAt: 1 });
db.logPaymentRecord.ensureIndex({ uid: 1, createdAt: 1, type: 1, action: 1 });



db.grantRecord.ensureIndex({ createdAt: 1 });
db.grantRecord.ensureIndex({ uid: 1 });
db.grantRecord.ensureIndex({ type: 1 });
db.grantRecord.ensureIndex({ uid: 1, createdAt: 1});
db.grantRecord.ensureIndex({ uid: 1, type: 1});
db.grantRecord.ensureIndex({ uid: 1, createdAt: 1, type: 1 });

