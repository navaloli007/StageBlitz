const mongoose = require("mongoose");

const dbURL = process.env.DB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log("Conneted to DB");
    }
    catch (err) {
        console.log("Error connecting to DB ", err);
    }
}

module.exports = connectDB;