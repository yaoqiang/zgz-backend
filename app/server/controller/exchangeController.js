import express from "express"

const router = express.Router();

router.get("/", (req, res) => {
  console.log("/...");
  res.send(200);
});

//--------------------
// 兑换列表
//--------------------
router.get("/list", (req, res) => {
  
});

router.get("/:id", (req, res) => {
  console.log("get...");
  const { username, password } = req.body
  console.log(username, password);

  
  res.send(200);
});



//--------------------
// 玩家兑换记录
//--------------------
router.get("/record/list", (req, res) => {
  
});

router.get("/record/:id", (req, res) => {
  console.log("get...");
  const { username, password } = req.body
  console.log(username, password);

  
  res.send(200);
});


export default router;