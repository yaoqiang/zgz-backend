import express from "express"

import { authenticationAccount } from "../filter/authFilter";

import { db } from "../service/mongodb";

import { config } from "../../config/index";

import * as passwordHash  from 'password-hash';

const router = express.Router();

router.get("/", (req, res) => {
  console.log("/...");
  res.send(200);
});

router.post("/signup", (req, res) => {
  const username = req.username;
  const password = passwordHash.generate(req.password);
  db.account.save({ username: username, password: password, enabled: true, createdAt: new Date() }, function (err, doc) {
    if (err) {
      res.send({ code: 500, err: '' })
      return;
    }

    res.send({
      code: 200
    });


  });
});

router.post("/login", (req, res) => {
  console.log("login...", req.body);
  const { username, password } = req.body
  console.log(username, password);
  
  // token: Token.create(doc._id, Date.now(), password.toString(), secret),
  //                   uid: doc._id

  if (username === 'admin' && password === 'admin') {
    res.send({ token: username, loggedIn: true, user: { username: 'admin' } });
    return;
  }
  res.send({ err: '用户名密码错误' });
});

router.post("/register", (req, res) => {
  console.log("login...");
  const { username, password } = req.body
  console.log(username, password);


  res.send(200);
});

router.post("/logout", authenticationAccount, (req, res) => {
  console.log("logout...");
  res.send(200);
});

export default router;