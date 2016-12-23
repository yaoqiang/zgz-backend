import express from "express"

import _ from "lodash";
import settings from '../const/settings';
import mongojs from 'mongojs';
import { db as db} from "../service/mongodb";

import qs from 'qs';

import gameService from "../service/gameService";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(200);
});

router.get("/list", (req, res) => {
  var query = {};
  req.query.offset = parseInt(req.query.offset) || settings.page.offset
  
  const queryJson = qs.parse(req.query);
  const { uid, mobile, nickName, offset } = queryJson; 
  
  const skip = offset;
  try {
    if (uid && uid !== '') {
      query._id = mongojs.ObjectId(uid);
    }
  } catch (e) {
    query._id = '';
  }
  
  
  if (mobile && mobile !== '') {
    query.mobile = mobile;
  }

  
  new Promise(function (resolve, reject) {

    //如果输入了昵称，先查询player，再回到user
    if (nickName && nickName !== '') {
      db.player.find({nickName: new RegExp(nickName, 'i')}, function (err, docs) {
        if (err) {
            reject(err);
            return;
          }
          var getUserPromise = _.map(docs, function(p) {
            return new Promise(function (resolve, reject) {
                db.user.findOne({_id: p.uid}, function(err, u) {
                  resolve(u);
                })
            });
          })

          Promise.all(getUserPromise).then(function(result) {
            resolve(result);
          })
        })
    }
    else {
      db.user.find(query).limit(settings.page.limit).skip(skip).sort({_id: 1}, function (err, docs) {
        if (err) {
          reject(err);
          return;
        }
        resolve(docs);
      })
    }
    
  })
    .then(function (userList) {
      if (userList && userList.length > 0) {
        const userListPromise = _.map(userList, function (user) {
          return new Promise(function (resolve, reject) {
            db.player.findOne({ uid: mongojs.ObjectId(user._id) }, function (err, player) {
              if (!player) {
                resolve({ uid: user._id, mobile: user.mobile, createdAt: user.createdAt, lastLoginAt: user.lastLoginAt });
              }
              else {
                resolve( { uid: user._id, mobile: user.mobile, nickName: player.nickName, createdAt: user.createdAt, lastLoginAt: user.lastLoginAt, 
              winNr: player.winNr, tieNr: player.tieNr, loseNr: player.loseNr, avatar: player.avatar, gold: player.gold,
              rank: player.rank, exp: player.exp, fragment: player.fragment, gender: player.gender, items: player.items, summary: player.summary });
              }
            })
          });
        });
        Promise.all(userListPromise).then(function (result) {
          db.user.count(query, function (err, total) {
            if (err) {
              reject(err);
              return;
            }
            res.send({ code: 200, userList: result, offset: offset, total: total, limit:settings.page.limit});
          })
          
        })
        return;
      }
      res.send({ code: 200, userList: [], offset: offset, total: 0, limit:settings.page.limit });
    }, function (err) {
      if (err) {
        res.send({ code: 500 });
        return;
      }
    });

});

router.get("/:id", (req, res) => {
  var query = {};
  const uid = req.params.id;
  try {
    if (uid && uid !== '') {
      query._id = mongojs.ObjectId(uid);
    }
  } catch (e) {
    query._id = '-1';
  }
  new Promise(function (resolve, reject) {
    db.user.findOne(query, function (err, doc) {
      if (err) {
        reject(err);
        return;
      }
      resolve(doc);
    })
  })
    .then(function (user) {
      if (user) {
        db.player.findOne({ uid: mongojs.ObjectId(user._id) }, function (err, player) {
          if (!player) {
            res.send({ code: 200, user: { uid: user._id, mobile: user.mobile, createdAt: user.createdAt, lastLoginAt: user.lastLoginAt } });
          }
          else {
            res.send({ code: 200, user: { uid: user._id, mobile: user.mobile, nickName: player.nickName, createdAt: user.createdAt, lastLoginAt: user.lastLoginAt, 
              winNr: player.winNr, tieNr: player.tieNr, loseNr: player.loseNr, avatar: player.avatar, gold: player.gold, meetingTimes: player.meetingTimes, 
              rank: player.rank, exp: player.exp, fragment: player.fragment, gender: player.gender, items: player.items, summary: player.summary } });
          }
        })
      }
    }, function (err) {
      if (err) {
        res.send({ code: 500 });
        return;
      }
    });
});

router.get("/getUser", (req, res) => {
  console.log("getUserByMobile...");
  res.send(200);
});

router.get("/getLogUserRecord", (req, res) => {
  console.log("getUserByMobile...");
  res.send(200);
});

router.get("/getLogLoginRecord", (req, res) => {
  console.log("getUserByMobile...");
  res.send(200);
});

router.get("/getLogPaymentRecord", (req, res) => {
  console.log("getUserByMobile...");
  res.send(200);
});

router.post("/recharge", (req, res) => {
  gameService.payment4OSS({uid: req.body.uid, productId: req.body.productId}, function (result) {
    res.send(result);
  })
});

router.post("/grant", (req, res) => {
  const uid = req.body.uid;
  const type = req.body.type;
  const gold = req.body.gold;
  const fragment = req.body.fragment;
  const items = req.body.items;

  //奖励记录
  var record = {uid: uid, type: type, gold: gold, fragment: fragment, items: items, createdAt: new Date()};
  db.grantRecord.save(record);


  new Promise((resolve, reject) => {
    if (gold) {
      gameService.addGold({uid: uid, gold: gold, type: type}, (r1) => {
        if (r1.code == 200) {
          resolve()
        }
        else {
          reject()
        }
      });
    }
    else {
      resolve()
    }
  })
  .then(() => {
    if (fragment) {
      gameService.addFragment({uid: uid, fragment: fragment, type: type}, (r1) => {
        if (r1.code == 200) {
          Promise.resolve()
        }
        else {
          Promise.reject()
        }
      });
    }
    else {
      Promise.resolve()
    }
  })
  .then(() => {
    if (items && items.length > 0) {
      gameService.addItems({uid: uid, items: items, type: type}, (r1) => {
        res.send(r1);
      });
    }
    else {
      res.send({code: 200});
    }
  });
  
});



router.post("/create", (req, res) => {
  console.log("create...");
  res.send(200);
});

router.post("/delete", (req, res) => {

});

export default router;