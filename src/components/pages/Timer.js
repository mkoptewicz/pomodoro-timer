import { useState, useEffect, useContext } from "react";

import ProgressCircle from "../ProgressCircle";
import ControlButtons from "../ControlButtons";
import "./Timer.css";
import SettingsContext from "../context/settings-contex";

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);

  const ctx = useContext(SettingsContext);
  console.log(ctx);
  const { pomodoroTimeInSeconds } = ctx.settings;

  useEffect(() => {
    let interval;
    if (elapsedTimeInSeconds >= pomodoroTimeInSeconds) {
      setIsRunning(false);
      setElapsedTimeInSeconds(0);
    }
    isRunning
      ? (interval = setInterval(() => {
          setElapsedTimeInSeconds(prevTime => prevTime + 0.1);
        }, 100))
      : clearInterval(interval);
    return () => clearInterval(interval);
  }, [elapsedTimeInSeconds, pomodoroTimeInSeconds, isRunning]);

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

  return (
    <>
      <h1>Timer</h1>
      <ProgressCircle
        timeInSeconds={pomodoroTimeInSeconds}
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
