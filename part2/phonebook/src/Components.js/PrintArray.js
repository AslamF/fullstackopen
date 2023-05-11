const Person = ({ name, number, deleteValue, toggleDelete }) => {
  console.log(deleteValue);
  return (
    <div>
      <div>
        {name} {number}
        <button onClick={toggleDelete}>DELETE</button>
      </div>
    </div>
  );
};

const PrintArray = ({ array, toggleDeleteOf }) => {
  return (
    <div>
      {array.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          deleteValue={person.deleteValue}
          toggleDelete={() => toggleDeleteOf(person.id)}
        />
      ))}
    </div>
  );
};

export default PrintArray;
