const Filter = (props) => {
  return (
    <div>
      Filter shown with: <input value={props.value} onChange={props.onChange} />
    </div>
  );
};

export default Filter;
