import express from "express"

const router = express.Router();

router.get("/", (req, res) => {
  console.log("/...");
  res.send(200);
});

router.get("/settings", (req, res) => {
  
});

router.post("/settings", (req, res) => {
  
});


router.get("/BBS", (req, res) => {
  console.log("login...");
  
  res.send(200);
});

router.post("/BBS", (req, res) => {
  console.log("login...");
  
  res.send(200);
});

router.post("/shutdown", (req, res) => {
  console.log("shutdown...");
  res.send(200);
});

export default router;