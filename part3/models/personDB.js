const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connted to mongodb");
  })
  .catch((error) => {
    console.log("error connecitng to mondoBD", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    required: true,
  },
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("PersonDB", personSchema);
