import express from "express"

import _ from "lodash";
import settings from '../const/settings';
import mongojs from 'mongojs';
import { db as db} from "../service/mongodb";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("/...");
  res.send(200);
});

router.get("/list", (req, res) => {
  console.log("list...");
  var query = {};
  const uid = req.query.uid;
  const mobile = req.query.mobile;
  const pageIndex = req.query.pageIndex

  const skip = ((pageIndex || settings.defaultPageIndex) - 1) * settings.pageSize;
  if (uid && uid !== '') {
    query._id = mongojs.ObjectId(uid);
  }
  if (mobile && mobile !== '') {
    query.mobile = mobile;
  }

  new Promise(function (resolve, reject) {
    db.user.find(query).limit(settings.pageSize).skip(skip, function (err, docs) {
      if (err) {
        reject(err);
        return;
      }
      resolve(docs);
    })
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
          res.send({ code: 200, userList: result });
        })
        return;
      }
      res.send({ code: 200, userList: [] });
    }, function (err) {
      if (err) {
        res.send({ code: 500 });
        return;
      }
    });

});

router.get("/:id", (req, res) => {
  console.log("get...");
  var query = {};
  const uid = req.query.uid;
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
              winNr: player.winNr, tieNr: player.tieNr, loseNr: player.loseNr, avatar: player.avatar, gold: player.gold,
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
  console.log("recharge...");
  res.send(200);
});

router.post("/grant", (req, res) => {
  console.log("grant...");
  res.send(200);
});



router.post("/create", (req, res) => {
  console.log("create...");
  res.send(200);
});

router.post("/delete", (req, res) => {

});

export default router;