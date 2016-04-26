import express from "express"

import { authenticationAccount } from "../filter/authFilter";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("/...");
  res.send(200);
});

router.get("/list", authenticationAccount, (req, res) => {
  
});

router.post("/:id", authenticationAccount, (req, res) => {
  console.log("login...");
  const { username, password } = req.body
  console.log(username, password);

  
  res.send(200);
});

router.post("/cancel", authenticationAccount, (req, res) => {
  res.send(200);
});

router.post("/finish", authenticationAccount, (req, res) => {
  res.send(200);
});

export default router;