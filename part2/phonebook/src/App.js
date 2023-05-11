import { useState, useEffect } from "react";
import PersonForm from "./Components.js/PersonForm";
import Filter from "./Components.js/Filter";
import PrintArray from "./Components.js/PrintArray";
import axios from "axios";
import personService from "./directory/persons";

const App = () => {
  const [person, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      deleteValue: false,
    };

    const currentNames = person.map((person) => person.name);

    if (currentNames.includes(newName)) {
      alert(`${newName} is already in phonebook`);
      return;
    }

    personService.create(personObject).then((response) => {
      setPersons(person.concat(response));
      setNewName("");
      setNewNumber("");
    });
  };
  const toggleDeleteOf = (id) => {
    const url = `http://localhost:3001/persons/${id}`;
    const personToDelete = person.find((i) => i.id === id);
    const deletedPerson = { ...personToDelete, deleteValue: true };

    personService.deletePerson(url, deletedPerson).then(() => {
      setPersons(person.filter((person) => person.id !== id));
    });
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const namesToShow = filterName
    ? person.filter((person) => person.name.toLowerCase().includes(filterName))
    : person;

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filterName} onChange={handleFilterChange} />

      <h2>add a new</h2>

      <PersonForm
        onSubmit={addPerson}
        valueName={newName}
        onChangeName={handlePersonChange}
        valueNumber={newNumber}
        onChangeNumber={handleNumberChange}
      />

      <h2>Numbers</h2>

      <PrintArray array={namesToShow} toggleDeleteOf={toggleDeleteOf} />
    </div>
  );
};
export default App;
