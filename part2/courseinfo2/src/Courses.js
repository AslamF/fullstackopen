const Header = (prop) => {
  return <h1>{prop.name}</h1>;
};
const Content = (prop) => {
  const parts = prop.parts;

  return (
    <div>
      {parts.map((part) => (
        <div key={part.id}>
          {part.name} {part.exercises}
        </div>
      ))}
    </div>
  );
};
const Total = (prop) => {
  const parts = prop.parts;
  const result = parts.reduce((acc, obj) => {
    return acc + obj.exercises;
  }, 0);
  return <div>Total of {result} Exercises</div>;
};

const Courses = (prop) => {
  const courses = prop.courses;

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <h1>Web development curriculum</h1>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Courses;
