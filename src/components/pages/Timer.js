import { useState, useEffect } from "react";

import ProgressCircle from "../ProgressCircle";
import ControlButtons from "../ControlButtons";
import "./Timer.css";

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);

  useEffect(() => {
    let interval;
    isRunning
      ? (interval = setInterval(() => {
          setElapsedTimeInSeconds(prevTime => prevTime + 0.1);
        }, 100))
      : clearInterval(interval);
    return () => clearInterval(interval);
  }, [isRunning]);

  const startHandler = () => {
    setIsRunning(true);
  };
  const stopHandler = () => {
    setIsRunning(false);
    setElapsedTimeInSeconds(0);
  };
  const pauseHandler = () => {
    setIsPaused(true);
    setIsRunning(false);
  };
  const continueHandler = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  console.log(elapsedTimeInSeconds);

  return (
    <>
      <h1>Timer</h1>
      <ProgressCircle
        timeInSeconds={5 * 60}
        elapsedTimeInSeconds={elapsedTimeInSeconds}
      />
      <ControlButtons
        isRunning={isRunning}
        isPaused={isPaused}
        onStart={startHandler}
        onStop={stopHandler}
        onPause={pauseHandler}
        onContinue={continueHandler}
      />
    </>
  );
};

export default Timer;
