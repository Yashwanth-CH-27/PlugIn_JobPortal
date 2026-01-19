const express = require("express");
const applicationRouter = express.Router();

// test route
applicationRouter.get("/", (req, res) => {
  res.send("application route working");
});

module.exports = applicationRouter ;
