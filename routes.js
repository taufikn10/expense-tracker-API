const UserController = require('./controller/UserController');
const AuthController = require('./controller/AuthController');
const IncomeController = require('./controller/IncomeController');
const ExpenseController = require('./controller/ExpenseController');
const BalanceController = require("./controller/BalanceController");

const _routes = [
  // http://localhost:8000/api/users
  ['users', UserController],
  // http://localhost:8000/api/login
  ['', AuthController],
  // http://localhost:8000/api/income
  ['income', IncomeController],
  // http://localhost:8000/api/expense
  ['expense', ExpenseController],
    // http://localhost:8000/api/balance
  ['balance', BalanceController],
];

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, controller] = route;

    // http://localhost:8000/api
    app.use(`/api/${url}`, controller);
  });
};

module.exports = routes;
