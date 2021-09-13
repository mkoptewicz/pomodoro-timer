import { useState, useEffect, useContext, useRef, useCallback } from "react";

import { Switch, Route } from "react-router-dom";

import SettingsContext from "./components/context/settings-contex";
import completedSound from "./sounds/completed.mp3";

import "./App.css";

import Nav from "./components/Nav";
import Timer from "./components/pages/Timer";
import Tasks from "./components/pages/Tasks";
import Settings from "./components/pages/Settings";
import NotFound from "./components/pages/NotFound";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);

  const settingsCtx = useContext(SettingsContext);
  const { pomodoroMins, pomodoroSecs } = settingsCtx.settings;
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
    if (isRunning) {
      document.addEventListener("visibilitychange", visibilityChangeHandler);
    }
    return () => {
      document.removeEventListener("visibilitychange", visibilityChangeHandler);
    };
  }, [isRunning, visibilityChangeHandler]);

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
    <div className="app">
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Timer
            timeInSeconds={pomodoroTimeInSeconds}
            elapsedTimeInSeconds={elapsedTimeInSeconds}
            isRunning={isRunning}
            isPaused={isPaused}
            onStart={startHandler}
            onStop={stopHandler}
            onPause={pauseHandler}
            onContinue={continueHandler}
          />
        </Route>
        <Route path="/tasks">
          <Tasks />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
