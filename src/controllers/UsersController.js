const User = require("../models/User");

const userRouter = require("express").Router();

userRouter.post("/", async (request, response) => {
    const { nickname, email, password } = request.body;

    const newUser = new User({
        nickname,
        email,
        password,
    });
    const user = await newUser.save();
    return response.json(user);
});

module.exports = { userRouter };
