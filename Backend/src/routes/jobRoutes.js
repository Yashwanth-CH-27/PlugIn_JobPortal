const express = require("express");
const jobRouter = express.Router();

// test route
jobRouter.get("/", (req, res) => {
  res.send("Auth route working");
});

module.exports = jobRouter;
