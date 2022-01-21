// startup/routes.js
const express = require("express");
const users = require("../routes/users");
const table = require("../routes/users");
const friends = require("../routes/friends");
const crud = require("../routes/crud");
const hitapi = require("../routes/hitapi");
const fg = require("../routes/fg");
const ats = require("../routes/new");
module.exports = function (app) {
  app.use(express.json());
  app.use("/", table);
  app.use("/table", table);
  app.use("/API", hitapi);
  app.use("/fg", fg);
  app.use("/ats", ats);
  app.use("/crud", crud);
  app.use("/api/friends", friends);
};
