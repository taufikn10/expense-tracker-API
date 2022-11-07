// Mapping function dari module ke API
const m$user = require("../modules/user.module");
const { Router } = require("express");
const response = require("../helpers/response");

const UserController = Router();

/** 
* Read User
* @param {string} name
* @param {string} email
* @param {string} password
// http://localhost:8000/api/users
*/
UserController.get("/", async (req, res) => {
  const list = await m$user.listUser();

  // Response helper
  response.sendResponse(res, list);
});

/** 
* Update User
* @param {number} id
* @param {string} name
* @param {string} email
* @param {string} password
// http://localhost:8000/api/users
*/
UserController.put("/", async (req, res) => {
  // Req body berisi data yg dikirim dari client
  const update = await m$user.updateUser(req.body);

  response.sendResponse(res, update);
});

/** 
* Delete User
* @param {number} id
// http://localhost:8000/api/users/:id
*/
UserController.delete("/:id", async (req, res) => {
  // Req params
  const del = await m$user.deleteUser(Number(req.params.id));

  response.sendResponse(res, del);
});

module.exports = UserController;
