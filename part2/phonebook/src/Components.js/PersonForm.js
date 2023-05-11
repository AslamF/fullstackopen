const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.valueName} onChange={props.onChangeName} />
      </div>
      <div>
        number:{" "}
        <input value={props.valueNumber} onChange={props.onChangeNumber} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
