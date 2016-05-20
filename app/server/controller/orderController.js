import express from "express"

import { authenticationAccount } from "../filter/authFilter";


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
  var query = {}, userQuery = {};
  const uid = req.query.uid;
  const mobile = req.query.mobile;
  const device = req.query.device;
  const state = req.query.state;
  const offset = req.query.offset || settings.page.offset

  const skip = offset;

  if (device && device !== '') {
    query.device = device;
  }

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
      
      db.order.find(query).sort({_id: -1}).limit(settings.page.limit).skip(skip, function (err, docs) {
        if (err) {
          resolve([]);
          return;
        }
        resolve(docs);
      })
    }))
    .then(orderList => new Promise((resolve, reject) => {
      db.order.count(query, function (err, total) {
        if (err) {
          res.send({ code: 500 });
          return;
        }
        
        orderList = orderList.map(order => {
          order.createdAt = order._id.getTimestamp();
          return order;
        })

        res.send({ code: 200, orderList: orderList, total: total, offset: offset, limit:settings.page.limit });
        return;
      })
    }));
});

router.get("/:id", (req, res) => {
  var query = {};
  const uid = req.params.id;

});

router.post("/cancel", authenticationAccount, (req, res) => {
  res.send(200);
});

router.post("/finish", authenticationAccount, (req, res) => {
  res.send(200);
});

export default router;