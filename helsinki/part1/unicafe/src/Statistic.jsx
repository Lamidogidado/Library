import { StatisticLine } from "./StatisticLine";

export const Statistic =({good,bad,neutral})=>{

  const all = good + neutral + bad;
   if (all === 0) {
    return <p>No feedback given</p>;
  }

  const average = (good - bad) / all; 
  const positive = (good / all) * 100;
return(
  <>
  <h1>Statistics</h1>
  <table>
    <tbody>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="All" value={all} />
      <StatisticLine text="Average Score" value={average.toFixed(2)} />
      <StatisticLine text="Positive" value={`${positive.toFixed(2)} %`} />
    </tbody>
  </table>
  </>

)
}