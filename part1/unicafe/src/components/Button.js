const Button = (prop) => (
  <button onClick={prop.handleClick}>{prop.text}</button>
);

export default Button;
