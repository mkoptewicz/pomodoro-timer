import { useState, useEffect, useContext, useRef, useCallback } from "react";

import { Switch, Route } from "react-router-dom";

import SettingsContext from "./contexts/settings-contex";
import completedSound from "./sounds/completed.mp3";

import "./App.css";

import Nav from "./components/Nav";
import Timer from "./components/pages/Timer";
import Tasks from "./components/pages/Tasks";
import Settings from "./components/pages/Settings";
import NotFound from "./components/pages/NotFound";
import AddTask from "./components/AddTask";
import getCurrentIndex from "./lib/getCurrentIndex";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timerIteration, setTimerIteration] = useState(0);
  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);

  //settings context
  const settingsCtx = useContext(SettingsContext);
  const {
    pomodoroMins,
    pomodoroSecs,
    longBreakMins,
    longBreakSecs,
    shortBreakMins,
    shortBreakSecs,
    longBreakInterval,
  } = settingsCtx.settings;
  const pomodoroTimeInSeconds = pomodoroMins * 60 + parseInt(pomodoroSecs);
  const shortBreakTimeInSeconds =
    shortBreakMins * 60 + parseInt(shortBreakSecs);
  const longBreakTimeInSeconds = longBreakMins * 60 + parseInt(longBreakSecs);
  const timeTemplate = [
    pomodoroTimeInSeconds,
    shortBreakTimeInSeconds,
    longBreakTimeInSeconds,
  ];
  const currentIndex = getCurrentIndex(timerIteration, +longBreakInterval);
  const currentTime = timeTemplate[currentIndex];

  console.log(currentIndex);

  //tasks context

  // Run the timer every 0.1s
  useEffect(() => {
    let interval;
    if (elapsedTimeInSeconds >= currentTime) {
      const audio = new Audio(completedSound);
      audio.play();
      setIsRunning(false);
      setTimerIteration(prevIteration => prevIteration + 1);
      setElapsedTimeInSeconds(0);
    }

    isRunning
      ? (interval = setInterval(() => {
          setElapsedTimeInSeconds(prevTime => prevTime + 0.1);
        }, 100))
      : clearInterval(interval);
    return () => clearInterval(interval);
  }, [elapsedTimeInSeconds, currentTime, isRunning]);

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
            timeInSeconds={currentTime}
            elapsedTimeInSeconds={elapsedTimeInSeconds}
            isRunning={isRunning}
            isPaused={isPaused}
            onStart={startHandler}
            onStop={stopHandler}
            onPause={pauseHandler}
            onContinue={continueHandler}
          />
        </Route>
        <Route path="/tasks" exact>
          <Tasks />
        </Route>
        <Route path="/tasks/addTask">
          <AddTask />
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
