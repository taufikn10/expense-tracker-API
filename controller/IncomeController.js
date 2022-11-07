const m$income = require("../modules/income.module");
const { Router } = require("express");
const response = require("../helpers/response");
const userSession = require("../helpers/middleware");

const IncomeController = Router();

/**
 * Get Income List
 *
 * http://localhost:8000/api/income
 */
IncomeController.get("/", userSession, async (req, res) => {
  const incomeList = await m$income.getIncome({
    user_id: req.user.id,
  });

  // response helper
  response.sendResponse(res, incomeList);
});

/**
 * Sum Income
 *
 * http://localhost:8000/api/income/sum
 */

IncomeController.get("/sum", userSession, async (req, res) => {
  console.log(req.user);
  const sum = await m$income.sumIncome({ id: req.user.id });

  // response helper
  response.sendResponse(res, sum);
  console.log("sum income api", sum);
});

/**
 * Create Income
 *
 * @param {String} description
 * @param {number} income
 * http://localhost:8000/api/income
 */

IncomeController.post("/", userSession, async (req, res) => {
  const createincome = await m$income.createIncome({
    user_id: req.user.id,
    ...req.body,
  });

  // response helper
  response.sendResponse(res, createincome);
});

/**
 * Update incomeList
 *
 * @param {String} description
 * @param {number} income
 * http://localhost:8000/api/income/:id
 */
IncomeController.put("/:id", userSession, async (req, res) => {
  const updateincome = await m$income.updateIncome(
    Number(req.params.id),
    req.body
  );

  // response helper
  response.sendResponse(res, updateincome);
});

/**
 * Delete Income
 *
 * http://localhost:8000/api/income/:id
 */
IncomeController.delete("/:id", userSession, async (req, res) => {
  const deleteIncome = await m$income.deleteIncome(Number(req.params.id));

  // response helper
  response.sendResponse(res, deleteIncome);
});

module.exports = IncomeController;
