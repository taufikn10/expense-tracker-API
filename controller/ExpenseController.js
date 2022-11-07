const m$expense = require("../modules/expense.module");
const { Router } = require("express");
const response = require("../helpers/response");
const userSession = require("../helpers/middleware");

const ExpenseController = Router();

/**
 * Get Expense List
 *
 * http://localhost:8000/api/expense
 */
ExpenseController.get("/", userSession, async (req, res) => {
  const expenseList = await m$expense.getExpense({
    user_id: req.user.id,
  });

  // response helper
  response.sendResponse(res, expenseList);
});

/**
 * Sum Expense
 *
 * http://localhost:8000/api/expense/sum
 */

ExpenseController.get("/sum", userSession, async (req, res) => {
  console.log(req.user);
  const sum = await m$expense.sumExpense({ id: req.user.id });

  // response helper
  response.sendResponse(res, sum);
  console.log("sum Expense api", sum);
});

/**
 * Create Expense
 *
 * @param {String} description
 * @param {number} expense
 * http://localhost:8000/api/expense
 */

ExpenseController.post("/", userSession, async (req, res) => {
  const createExpense = await m$expense.createExpense({
    user_id: req.user.id,
    ...req.body,
  });

  // response helper
  response.sendResponse(res, createExpense);
});

/**
 * Create Expense
 *
 * @param {String} description
 * @param {number} expense
 * http://localhost:8000/api/expense/:id
 */

ExpenseController.put("/:id", userSession, async (req, res) => {
  const updateExpense = await m$expense.updateExpense(
    Number(req.params.id),
    req.body
  );

  // response helper
  response.sendResponse(res, updateExpense);
});

/**
 * Delete Expense
 *
 * http://localhost:8000/api/expense/:id
 */
ExpenseController.delete("/:id", userSession, async (req, res) => {
  const deleteExpense = await m$expense.deleteExpense(Number(req.params.id));

  // response helper
  response.sendResponse(res, deleteExpense);
});

module.exports = ExpenseController;
