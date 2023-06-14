require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB
    : process.env.MONGODB;

module.exports = {
  MONGODB,
  PORT,
};
