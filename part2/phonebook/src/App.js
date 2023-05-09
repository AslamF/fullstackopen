import { useState } from "react";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import PrintArray from "./PrintArray";

const App = () => {
  const [person, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setNewFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const currentNames = person.map((person) => person.name);

    if (currentNames.includes(newName)) {
      alert(`${newName} is already in phonebook`);
      return;
    }

    setPersons(person.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handlePersonChange = (event) => {
    console.log(event.target.value);
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

      <PrintArray array={namesToShow} />
    </div>
  );
};
export default App;
