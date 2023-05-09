import { useState } from "react";

const Person = (prop) => {
  return <div>{prop.name}</div>;
};
const App = () => {
  const [person, setPersons] = useState([
    {
      name: "Arto Hellas",
    },
  ]);

  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    console.log(event.target);
    const personObject = {
      name: newName,
    };

    setPersons(person.concat(personObject));
    setNewName("");
  };
  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {person.map((person) => (
          <Person name={person.name} />
        ))}
      </div>

      <div>debug: {newName}</div>
    </div>
  );
};
export default App;
