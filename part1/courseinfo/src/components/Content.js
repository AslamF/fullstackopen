import Part from "./Part";
const Content = () => {
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  return (
    <div>
      <Part part={part1} number={exercises1} />
      <Part part={part2} number={exercises2} />
      <Part part={part3} number={exercises3} />
    </div>
  );
};

export default Content;
