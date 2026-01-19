const express = require("express");
const authRouter = express.Router();

// test route
authRouter.get("/", (req, res) => {
  res.send("Auth route working");
});

module.exports = authRouter;
