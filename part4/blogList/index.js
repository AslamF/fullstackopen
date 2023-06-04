require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const notesRouter = require("./controllers/blogs");
const logger = require("./utils/logger");

mongoose.set("strictQuery", false);

logger.info(`Server running on port ${config.PORT}`);

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", notesRouter);
