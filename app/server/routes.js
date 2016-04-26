import express from "express"

import { authenticationAccount } from "./filter/authFilter";

import authController from "./controller/authController"


import dashboardController from "./controller/dashboardController"

import userController from "./controller/userController"
import orderController from "./controller/orderController"
import exchangeController from "./controller/exchangeController"
import gameController from "./controller/gameController"

const router = express.Router();



router.use("/", authenticationAccount, dashboardController);

router.use("/auth", authController);

router.use("/user", authenticationAccount, userController);
router.use("/order", authenticationAccount, orderController);
router.use("/exchange", authenticationAccount, exchangeController);
router.use("/game", authenticationAccount, gameController);


router.use("/*", (req, res) => {
  res.sendStatus(404);
});

export default router;;