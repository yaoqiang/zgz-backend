import express from "express"

import gameService from "../service/gameService";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("/...");
  res.send(200);
});

router.get("/settings", (req, res) => {
  
});

router.post("/settings", (req, res) => {
  
});


router.get("/getShopList", (req, res) => {
  console.log("getShopList...");
  gameService.getShopList(function (result) {
    res.send({shopList: result.shopList, code: result.code});
    
  })
});

router.get("/getItemList", (req, res) => {
  console.log("getItemList...");
  gameService.getItemList(function (result) {
    res.send({itemList: result.itemList, code: result.code});
  })
});

router.post("/sendBBS", (req, res) => {
  console.log("sendBBS...");
  gameService.sendBBS({content: req.body.content}, function (result) {
    res.send({code: result.code});
  })
});

router.post("/shutdown", (req, res) => {
  console.log("shutdown...");
  res.send(200);
});

export default router;