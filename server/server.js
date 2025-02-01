const express = require("express");
const app = express();
require('dotenv').config(); // load env variable into process.env

const connectDB = require("./config/db");

connectDB();

const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRouter");

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);

app.listen("8082", () => {
    console.log("Server started at port 8082");
})
