import ProgressCircle from "../ProgressCircle";
import ControlButtons from "../ControlButtons";
import "./Timer.css";

const Timer = () => {
  return (
    <>
      <h1>Timer</h1>
      <ProgressCircle timeInSeconds={5 * 60} />
      <ControlButtons />
    </>
  );
};

export default Timer;
