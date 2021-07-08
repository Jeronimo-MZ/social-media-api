const { userRouter } = require("./controllers/UsersController");

const router = require("express").Router();

router.use("/users", userRouter);

module.exports = { router };
