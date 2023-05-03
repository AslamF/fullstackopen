const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.stats}</td>
    </tr>
  );
};

export default StatisticLine;
