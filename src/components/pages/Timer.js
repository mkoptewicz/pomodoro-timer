import ProgressCircle from "../ProgressCircle";
import ControlButtons from "../ControlButtons";

import "./Timer.css";

const Timer = ({
  timeInSeconds,
  elapsedTimeInSeconds,
  isRunning,
  isPaused,
  onStart,
  onStop,
  onPause,
  onContinue,
}) => {
  return (
    <>
      <h1>Timer</h1>
      <ProgressCircle
        timeInSeconds={timeInSeconds}
        elapsedTimeInSeconds={elapsedTimeInSeconds}
      />
      <ControlButtons
        isRunning={isRunning}
        isPaused={isPaused}
        onStart={onStart}
        onStop={onStop}
        onPause={onPause}
        onContinue={onContinue}
      />
    </>
  );
};

export default Timer;
