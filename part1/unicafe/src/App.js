import React from "react";
import { useState } from "react";
import Header from "./components/Header";
import StatisticLine from "./components/StatisticLine";
import Button from "./components/Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [summation, setSum] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(updatedGood + neutral + bad);
    setSum(summation + 1);
  };

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotal(good + updatedNeutral + bad);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotal(good + neutral + updatedBad);
    setSum(summation - 1);
  };

  const Statistics = () => {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" stats={good} />
          <StatisticLine text="neutral" stats={neutral} />
          <StatisticLine text="bad" stats={bad} />
          <StatisticLine text="total" stats={total} />
          <StatisticLine text="average" stats={summation / total} />
          <StatisticLine text="positive" stats={(good / total) * 100} />
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Header text="Give Feedback" />
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <Header text="Statistics" />
      <Statistics />
    </div>
  );
};
export default App;
