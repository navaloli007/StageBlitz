const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user", "partner"],
        default: "user"
    }
})

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;