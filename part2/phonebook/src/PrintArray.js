const Person = (prop) => {
  return (
    <div>
      {prop.name} {prop.number}
    </div>
  );
};

const PrintArray = (props) => {
  return (
    <div>
      {props.array.map((person) => (
        <Person key={person.number} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default PrintArray;
