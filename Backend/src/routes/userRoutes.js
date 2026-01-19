const express = require("express");
const userRouter = express.Router();

// test route
userRouter.get("/", (req, res) => {
  res.send("Auth route working");
});

module.exports = userRouter;
