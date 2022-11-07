const m$auth = require("../modules/auth.module");
const { Router } = require("express");
const response = require("../helpers/response");

const AuthController = Router();

/** 
* Create User
* @param {string} name
* @param {string} email
* @param {string} password
// http://localhost:8000/api/users
*/
AuthController.post("/register", async (req, res) => {
  // Req body berisi data yg dikirim dari client
  const add = await m$auth.register(req.body);

  response.sendResponse(res, add);
});

/** 
* Login
* @param {string} email
* @param {string} password
// http://localhost:8000/api/login
*/
AuthController.post("/login", async (req, res) => {
  const login = await m$auth.login(req.body);

  response.sendResponse(res, login);
});

module.exports = AuthController;
