import express from "express"

import { authenticationAccount } from "../filter/authFilter";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("/...");
  //
  res.send(200);
});



export default router;