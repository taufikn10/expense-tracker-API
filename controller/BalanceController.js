// Mapping function dari module ke API
const m$balance = require("../modules/balance.module");
const { Router } = require("express");
const response = require("../helpers/response");
const userSession = require("../helpers/middleware");

const BalanceController = Router();

/**
 * Get Balance
 *
 * http://localhost:8000/api/balance
 */

 BalanceController.get("/", userSession, async (req, res) => {
  console.log(req.user);
  const list = await m$balance.getBalance({ id: req.user.id });

  // response helper
  response.sendResponse(res, list);
  console.log("get balance api", list);
});



module.exports = BalanceController;
