const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    console.log(req.body);
    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.send({
                success: true,
                message: "User already exists"
            })
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            success: true,
            message: "User registered successfully",
            data: newUser
        })
    }
    catch (err) {
        return res.status(404).json({ success: false, message: err.message });
    }
})

userRouter.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: "User not found"
            });
        }
        if (req.body.password !== user.password) {
            return res.send({
                success: false,
                message: "Invalid password"
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log(token);
        res.send({
            success: true,
            message: "User logged in successfully",
            data: token
        });
    }
    catch (err) {
        res.status(404).send({ success: false, message: err.message });
    }
});

module.exports = userRouter;