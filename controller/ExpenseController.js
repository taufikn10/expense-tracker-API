const m$expense = require('../modules/expense.module');
const { Router } = require('express');
const response = require('../helpers/response');
const userSession = require('../helpers/middleware');

const ExpenseController = Router();

/**
 * Get Controller List
 *
 * http://localhost:8000/api/controller
 */
ExpenseController.get('/', userSession, async (req, res) => {
  const expenseList = await m$expense.getIncome({
    user_id: req.user.id,
  });

  // response helper
  response.sendResponse(res, expenseList);
});

/**
 * Sum Controller
 *
 * http://localhost:8000/api/controller/sum
 */

ExpenseController.get('/sum', userSession, async (req, res) => {
  console.log(req.user);
  const sum = await m$expense.sumIncome({ id: req.user.id });

  // response helper
  response.sendResponse(res, sum);
  console.log('sum expense api', sum);
});

/**
 * Create Expense
 *
 * @param {String} description
 * @param {number} expense
 * http://localhost:8000/api/expense
 */

ExpenseController.post('/', userSession, async (req, res) => {
  const createexpense = await m$expense.createExpense({
    user_id: req.user.id,
    ...req.body,
  });

  // response helper
  response.sendResponse(res, createexpense);
});

/**
 * Update ExpenseList
 *
 * @param {String} description
 * @param {number} expense
 * http://localhost:8000/api/expense/:id
 */
ExpenseController.put('/:id', userSession, async (req, res) => {
  const updateexpense = await m$expense.updateExpense(Number(req.params.id), req.body);

  // response helper
  response.sendResponse(res, updateexpense);
});

/**
 * Delete Expense
 *
 * http://localhost:8000/api/expense/:id
 */
ExpenseController.delete('/:id', userSession, async (req, res) => {
  const deleteExpense = await m$expense.deleteExpense(Number(req.params.id));

  // response helper
  response.sendResponse(res, deleteExpense);
});

module.exports = ExpenseController;
