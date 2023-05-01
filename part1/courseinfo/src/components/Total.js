const Total = (prop) => {
  return (
    <p>
      Number of exercises{" "}
      {prop.parts[0].exercises +
        prop.parts[1].exercises +
        prop.parts[2].exercises}
    </p>
  );
};

export default Total;
