import { useState, useEffect, useContext, useCallback, useRef } from "react";

import ProgressCircle from "../ProgressCircle";
import ControlButtons from "../ControlButtons";
import SettingsContext from "../context/settings-contex";
import completedSound from "../../sounds/completed.mp3";
import "./Timer.css";

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);

  const ctx = useContext(SettingsContext);
  const { pomodoroMins, pomodoroSecs } = ctx.settings;
  const pomodoroTimeInSeconds = pomodoroMins * 60 + parseInt(pomodoroSecs);

  // Run the timer every 0.1s
  useEffect(() => {
    let interval;
    if (elapsedTimeInSeconds >= pomodoroTimeInSeconds) {
      const audio = new Audio(completedSound);
      audio.play();
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

  //Run the timer when tab is inactive
  const hideTime = useRef(0);

  const visibilityChangeHandler = useCallback(() => {
    if (document.hidden) {
      hideTime.current = Date.now();
    } else {
      const elapsedTimeWhenHidden = (Date.now() - hideTime.current) / 1000;

      setElapsedTimeInSeconds(
        prevElapsedTime => prevElapsedTime + elapsedTimeWhenHidden
      );
    }
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", visibilityChangeHandler);

    return () => {
      document.removeEventListener("visibilitychange", visibilityChangeHandler);
    };
  }, [visibilityChangeHandler]);

  //Handlers
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
