const m$tracker = require("../modules/tracker.module");
const { Router } = require("express");
const response = require("../helpers/response");
const userSession = require("../helpers/middleware");

const TrackerController = Router();

/**
 * Get Tracjer
 *
 * http://localhost:8000/api/tracker
 */

 TrackerController.get("/", userSession, async (req, res) => {
  console.log(req.user);
  const list = await m$tracker.getTracker({ id: req.user.id });

  // response helper
  response.sendResponse(res, list);
  console.log("get tracker api", list);
});



module.exports = TrackerController;