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

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// entire list of all
app.get("/api/persons", (request, response) => {
  PersonDB.find({}).then((person) => {
    response.json(person);
  });
});

app.get("/api/info", (request, response) => {
  response.send(
    `<tag> Phonebook has info for ${persons.length}</tag> people ${new Date()}`
  );
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
  //console.log(request);
  //const id = Number(request.params.id);
  //persons = persons.filter((person) => person.id !== id);

  //response.status(204).end();
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({
      error: "missing content",
    });
  }

  const currentPeople = persons.map((person) => person.name);

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
  //persons = persons.concat(person);
  //response.json(savedNote);
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
