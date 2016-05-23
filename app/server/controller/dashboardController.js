import express from "express"

import { authenticationAccount } from "../filter/authFilter";


import _ from "lodash";
import settings from '../const/settings';

import moment from 'moment';
import gameService from "../service/gameService";

import mongojs from 'mongojs';
import { db as db} from "../service/mongodb";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("/...");
  //
  res.send(200);
});

router.get("/onlineUserTotal", (req, res) => {
  gameService.getOnlineUserTotal(function (result) {
    res.send(result);
    
  })
  //
});

router.get("/acquisition", (req, res) => {
  console.log("/acquisition...");
  const total = db.user.count({}, function (err, dbRes) {
    res.send({ acquisition: dbRes });
  });
  //
});

router.get("/acquisitionLastDay", (req, res) => {
  console.log("/acquisitionLastDay...");
  const total = db.user.count({ createdAt: { $gt: new Date(moment().add(-1, 'days').format('YYYY-MM-DD')), $lte: new Date(moment().format('YYYY-MM-DD')) } }, function (err, dbRes) {
    res.send({ acquisitionLastDay: dbRes });
  });
});

router.get("/acquisitionLastWeek", (req, res) => {
  console.log("/acquisitionLastWeek...");
  const total = db.user.count({ createdAt: { $gt: new Date(moment().add(-1, 'weeks').format('YYYY-MM-DD')), $lte: new Date(moment().format('YYYY-MM-DD')) } }, function (err, dbRes) {
    res.send({ acquisitionLastWeek: dbRes });
  });
});

router.get("/acquisitionLastTwoWeek", (req, res) => {
  console.log("/acquisitionLastTwoWeek...");
  const total = db.user.count({ createdAt: { $gt: new Date(moment().add(-2, 'weeks').format('YYYY-MM-DD')), $lte: new Date(moment().format('YYYY-MM-DD')) } }, function (err, dbRes) {
    res.send({ acquisitionLastTwoWeek: dbRes } );
  });
});

router.get("/acquisitionLastMonth", (req, res) => {
  console.log("/acquisitionLastMonth...");

  const total = db.user.count({ createdAt: { $gt: new Date(moment().add(-1, 'months').format('YYYY-MM-DD')), $lte: new Date(moment().format('YYYY-MM-DD')) } }, function (err, dbRes) {
    res.send({ acquisitionLastMonth: dbRes });
  });
});


router.get("/revenue", (req, res) => {
  console.log("/...");
  //
  res.send(200);
});

router.get("/revenueLastDay", (req, res) => {
  console.log("/...");
  //
  res.send(200);
});

router.get("/revenueLastWeek", (req, res) => {
  console.log("/...");
  //
  res.send(200);
});

router.get("/revenueLastTwoWeek", (req, res) => {
  console.log("/...");
  //
  res.send(200);
});

router.get("/revenueLastMonth", (req, res) => {
  console.log("/...");
  //
  res.send(200);
});

router.get("/activationLastDay", (req, res) => {
  console.log("/activationLastDay...");

  //
  const total = db.logLoginRecord.aggregate(
    [
      { $match: { createdAt: { $gt: new Date(moment().add(-1, 'days').format('YYYY-MM-DD')) } } },
      {
        $group: {
          "_id": { uid: "$uid" },
          "count": { $sum: 1 }
        }
      }
    ]).toArray(function (err, result) {
      res.send({ activationLastDay: result.length });
    })




});



router.get("/activationLastWeek", (req, res) => {
  console.log("/...");
  //
  db.logLoginRecord.aggregate(
    [
      { $match: { createdAt: { $gt: new Date(moment().add(-1, 'weeks').format('YYYY-MM-DD')) } } },
      {
        $group: {
          "_id": { uid: "$uid" },
          "count": { $sum: 1 }
        }
      }
    ]).toArray(function (err, result) {
      res.send({ activationLastWeek: result.length });
    })
});

router.get("/activationLastTwoWeek", (req, res) => {
  console.log("/...");
  //
  db.logLoginRecord.aggregate(
    [
      { $match: { createdAt: { $gt: new Date(moment().add(-2, 'weeks').format('YYYY-MM-DD')) } } },
      {
        $group: {
          "_id": { uid: "$uid" },
          "count": { $sum: 1 }
        }
      }
    ]).toArray(function (err, result) {
      res.send({ activationLastTwoWeek: result.length });
    })
});

router.get("/activationLastMonth", (req, res) => {
  console.log("/...");
  //
  db.logLoginRecord.aggregate(
    [
      { $match: { createdAt: { $gt: new Date(moment().add(-1, 'months').format('YYYY-MM-DD')) } } },
      { $group: { 
        "_id": {uid: "$uid"},
        "count": { $sum: 1 } 
      } }
    ]).toArray(function(err, result) {
      res.send({ activationLastMonth: result.length });
    })

});

router.get("/retentionLastDay", (req, res) => {
  console.log("/...");
  //
  res.send(200);
});

router.get("/retentionLastWeek", (req, res) => {
  console.log("/...");
  //
  res.send(200);
});

router.get("/retentionLastTwoWeek", (req, res) => {
  console.log("/...");
  //
  res.send(200);
});

router.get("/retentionLastMonth", (req, res) => {
  console.log("/...");
  //
  res.send(200);
});


export default router;