const express = require("express");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogRequests");
const logger = require("./utils/logger");
const usersRouter = require("./controllers/userRequests");
const loginRouter = require("./controllers/loginRequests");

mongoose.set("strictQuery", false);

mongoose.connect(config.MONGODB);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

module.exports = app;
