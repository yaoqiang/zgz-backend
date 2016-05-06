import express from "express"

import { authenticationAccount } from "../filter/authFilter";

import moment from 'moment';

import mongojs from 'mongojs';
import { db as db} from "../service/mongodb";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("/...");
  //
  res.send(200);
});

router.get("/acquisition", (req, res) => {
  console.log("/acquisition...");
  const total = db.user.count({}, function (err, dbRes) {
    res.send({ code: 200, total: dbRes });
  });
  //
});

router.get("/acquisitionLastDay", (req, res) => {
  console.log("/acquisitionLastDay...");
  const total = db.user.count({ createdAt: { $gt: moment().add(-1, 'days').format('YYYY-MM-DD') } }, function (err, dbRes) {
    res.send({ code: 200, total: dbRes });
  });
});

router.get("/acquisitionLastWeek", (req, res) => {
  console.log("/acquisitionLastWeek...");
  const total = db.user.count({ createdAt: { $gt: moment().add(-1, 'weeks').format('YYYY-MM-DD') } }, function (err, dbRes) {
    res.send({ code: 200, total: dbRes });
  });
});

router.get("/acquisitionLastTwoWeek", (req, res) => {
  console.log("/acquisitionLastTwoWeek...");
  const total = db.user.count({ createdAt: { $gt: moment().add(-2, 'weeks').format('YYYY-MM-DD') } }, function (err, dbRes) {
    res.send({ code: 200, total: dbRes });
  });
});

router.get("/acquisitionLastMonth", (req, res) => {
  console.log("/acquisitionLastMonth...");

  const total = db.user.count({ createdAt: { $gt: moment().add(-1, 'months').format('YYYY-MM-DD') } }, function (err, dbRes) {
    res.send({ code: 200, total: dbRes });
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
      { $match: { createdAt: { $gt: moment().add(-1, 'days').format('YYYY-MM-DD') } } },
      { $group: { 
        "_id": {uid: "$uid"},
        "count": { $sum: 1 } 
      } }
    ]).toArray().length;
    
    res.send({ code: 200, total: total });
});



router.get("/activationLastWeek", (req, res) => {
  console.log("/...");
  //
  db.logLoginRecord.aggregate(
    [
      { $match: { createdAt: { $gt: moment().add(-1, 'weeks').format('YYYY-MM-DD') } } },
      { $group: { 
        "_id": {uid: "$uid"},
        "count": { $sum: 1 } 
      } }
    ]).toArray().length;
    
    res.send({ code: 200, total: total });
});

router.get("/activationLastTwoWeek", (req, res) => {
  console.log("/...");
  //
  db.logLoginRecord.aggregate(
    [
      { $match: { createdAt: { $gt: moment().add(-2, 'weeks').format('YYYY-MM-DD') } } },
      { $group: { 
        "_id": {uid: "$uid"},
        "count": { $sum: 1 } 
      } }
    ]).toArray().length;
    
    res.send({ code: 200, total: total });
});

router.get("/activationLastMonth", (req, res) => {
  console.log("/...");
  //
  db.logLoginRecord.aggregate(
    [
      { $match: { createdAt: { $gt: moment().add(-1, 'months').format('YYYY-MM-DD') } } },
      { $group: { 
        "_id": {uid: "$uid"},
        "count": { $sum: 1 } 
      } }
    ]).toArray().length;
    
    res.send({ code: 200, total: total });
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