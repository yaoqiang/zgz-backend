import express from "express"

const router = express.Router();

router.get("/", (req, res) => {
  res.send(200);
});

//--------------------
// 兑换列表
//--------------------
router.get("/list", (req, res) => {
  
});

router.get("/:id", (req, res) => {
  const { username, password } = req.body

  
  res.send(200);
});



//--------------------
// 玩家兑换记录
//--------------------
router.get("/record/list", (req, res) => {
  
});

router.get("/record/:id", (req, res) => {
  const { username, password } = req.body

  
  res.send(200);
});


export default router;