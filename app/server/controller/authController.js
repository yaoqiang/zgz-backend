import express from "express"

import { authenticationAccount } from "../filter/authFilter";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("/...");
  res.send(200);
});

router.post("/login", (req, res) => {
  console.log("login...", req.body);
  const { username, password } = req.body
  console.log(username, password);

  if (username === 'admin' && password === 'admin') {
    res.send({token: username, loggedIn: true, user: {username: 'admin'}});
    return;
  }
  res.send({err: '用户名密码错误'});
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