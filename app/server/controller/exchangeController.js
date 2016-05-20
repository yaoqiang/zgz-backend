import express from "express"

const router = express.Router();

router.get("/", (req, res) => {
  res.send(200);
});

//--------------------
// 兑换列表
//--------------------
router.get("/list", (req, res) => {
  
});

router.get("/:id", (req, res) => {
  const { username, password } = req.body

  
  res.send(200);
});



//--------------------
// 玩家兑换记录
//--------------------
router.get("/record/list", (req, res) => {
  var query = {}, userQuery = {};
  
  req.query.offset = parseInt(req.query.offset) || settings.page.offset
  
  const queryJson = qs.parse(req.query);
  const { uid, mobile, state, offset } = queryJson; 
  

  const skip = offset;

  if (state && state !== '') {
    query.state = state;
  }

  new Promise(function (resolve, reject) {
    try {
      if (uid && uid !== '') {
        userQuery._id = mongojs.ObjectId(uid);
      }
    } catch (e) {
      userQuery._id = '';
    }

    if (mobile && mobile !== '') {
      userQuery.mobile = mobile;
    }
    if (_.keys(userQuery).length > 0) {
      db.user.findOne(userQuery, function (err, user) {
        if (err) {
          reject(err);
          return;
        }
        resolve(user);
      })
    }
    else {
      resolve(null);
    }

  })
    .then(user => new Promise((resolve, reject) => {
      //如果输入了用户条件没有查到, 则返回空数组
      if (!user && _.keys(userQuery).length > 0) {
          query.uid = -1;
      }

      if (user) {
        query.uid = user._id.toString();
      }
      
      db.exchangeRecord.find(query).sort({_id: -1}).limit(settings.page.limit).skip(skip, function (err, docs) {
        if (err) {
          resolve([]);
          return;
        }
        resolve(docs);
      })
    }))
    .then(exchangeRecordList => new Promise((resolve, reject) => {
      db.exchangeRecord.count(query, function (err, total) {
        if (err) {
          res.send({ code: 500 });
          return;
        }
        
        res.send({ code: 200, exchangeRecordList: exchangeRecordList, total: total, offset: offset, limit:settings.page.limit });
        return;
      })
    }));
});

router.get("/record/:id", (req, res) => {
  const { username, password } = req.body

  
  res.send(200);
});


export default router;
