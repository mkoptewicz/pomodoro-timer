import { useState, useEffect, useContext, useRef, useCallback } from "react";

import { Switch, Route } from "react-router-dom";

import SettingsContext from "./contexts/settings-contex";

import Nav from "./components/Nav";
import Timer from "./components/pages/Timer";
import Tasks from "./components/pages/Tasks";
import Settings from "./components/pages/Settings";
import NotFound from "./components/pages/NotFound";
import AddTask from "./components/AddTask";
import getCurrentTimer from "./lib/getCurrentTimer";

import "./App.css";
import completedSound from "./sounds/completed.mp3";
import TasksContext from "./contexts/tasks-context";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timerIteration, setTimerIteration] = useState(0);
  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);
  const [pomodoroWasCompleted, setPomodoroWasCompleted] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  //settings context
  const settingsCtx = useContext(SettingsContext);

  const {
    pomodoroMins,
    shortBreakMins,
    longBreakMins,
    longBreakInterval: interval,
  } = settingsCtx.settings;

  const defaultTask = {
    id: null,
    pomodoroTimeInSeconds: pomodoroMins * 60,
    shortBreakTimeInSeconds: shortBreakMins * 60,
    longBreakTimeInSeconds: longBreakMins * 60,
    interval,
    pomodoroNumber: 1,
    pomodorosCompleted: 0,
  };

  //tasks context
  const {
    tasks,
    completeTaskHandler,
    markAsCurrentHandler,
    changePomodorosCompletedHandler,
  } = useContext(TasksContext);

  const currentTask = tasks.find(task => task.isCurrent) || defaultTask;

  const currentTime = getCurrentTimer(currentTask, timerIteration);

  //Don't increment completed pomodoros when break ends
  useEffect(() => {
    if (timerIteration % 2 !== 0) {
      setCompletedPomodoros(prevCompleted => prevCompleted + 1);
    }
  }, [timerIteration]);

  useEffect(() => {
    changePomodorosCompletedHandler(currentTask.id, completedPomodoros);
  }, [currentTask.id, completedPomodoros]);

  //Mark as completed when all pomodoros set in the task are completed
  useEffect(() => {
    if (Math.ceil(timerIteration / 2) === currentTask.pomodoroNumber) {
      completeTaskHandler(currentTask.id);
      setPomodoroWasCompleted(true);
      setTimerIteration(0);
    }
  }, [
    timerIteration,
    currentTask.id,
    currentTask.pomodoroNumber,
    completeTaskHandler,
  ]);

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

  //Update the timer when tab goes from inactive to active
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

  //Hide message after 3 seconds
  useEffect(() => {
    let timeout;
    if (pomodoroWasCompleted) {
      timeout = setTimeout(() => {
        setPomodoroWasCompleted(false);
        markAsCurrentHandler(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [pomodoroWasCompleted, markAsCurrentHandler]);

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
  console.log(currentTask);

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
            pomodoroWasCompleted={pomodoroWasCompleted}
          />
        </Route>
        <Route path="/tasks" exact>
          <Tasks />
        </Route>
        <Route path="/tasks/addTask" exact>
          <AddTask />
        </Route>
        <Route path="/tasks/addTask/:taskId">
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
