import ProgressCircle from "../ProgressCircle";
import "./Timer.css";

const Timer = () => {
  return (
    <>
      <h1>Timer</h1>
      <ProgressCircle timeInSeconds={60} />
    </>
  );
};

export default Timer;
