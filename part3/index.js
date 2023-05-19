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

// get info on the amount of people are in the phonebook
app.get("/api/info", (request, response) => {
  response.send(
    `<tag> Phonebook has info for ${PersonDB.length}</tag> people ${new Date()}`
  );
});

//get an individual person from the database based on their id
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

// handle error
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
// delete an item from database
app.delete("/api/persons/:id", (request, response, next) => {
  PersonDB.findByIdAndRemove(request.params.id)
    .then((result) => {
      console.log("deleted", result);
      response.status(204).end();
    })
    .catch((error) => next(error));
});
// create a person/number and add it to the database
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({
      error: "missing content",
    });
  }

  const currentPeople = PersonDB.map((person) => person.name);

  if (currentPeople.includes(body.name)) {
    return response.status(400).json({
      error: "need unique name",
    });
  }

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
