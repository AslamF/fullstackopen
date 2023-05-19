require("dotenv").config();
const { request, response } = require("express");

const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

const PersonDB = require("./models/personDB");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// entire list of all
app.get("/api/persons", (request, response) => {
  PersonDB.find({}).then((person) => {
    response.json(person);
  });
});

// get info on number of entries
app.get("/info", (request, response, next) => {
  PersonDB.countDocuments({})
    .then((number) => {
      let info = `<p>Phonebook has info for ${number} people</p>`;
      info += new Date();
      response.send(info);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  PersonDB.findById(request.params.id)
    .then((person) => {
      if (person) {
        console.log(person);
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.delete("/api/persons/:id", (request, response, next) => {
  PersonDB.findByIdAndRemove(request.params.id)
    .then((result) => {
      console.log("deleted", result);
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const person = new PersonDB({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
