const express = require("express");
const cors = require("cors");
const routes = require("../routes");

const app = express();
const port = 8000;

// Handle Cors, Form Data, dan Json
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
routes(app);

module.exports = app;
