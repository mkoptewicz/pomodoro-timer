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
  };

  //tasks context
  const { tasks, onCompleteTask, onMarkAsCurrent, onChangePomodorosCompleted } =
    useContext(TasksContext);

  const currentTask = tasks.find(task => task.isCurrent) || defaultTask;

  const currentTime = getCurrentTimer(currentTask, timerIteration);

  //Update completed pomodoros when the task has changed
  useEffect(() => {
    setCompletedPomodoros(currentTask.pomodorosCompleted);
  }, [currentTask.id]); //eslint-disable-line

  //Set timer's type to pomodoro when the task has changed
  useEffect(() => {
    setTimerIteration(0);
  }, [currentTask.id]);

  //Don't increment completed pomodoros when break ends
  useEffect(() => {
    if (timerIteration % 2 !== 0 && timerIteration > 0) {
      setCompletedPomodoros(prevCompleted => prevCompleted + 1);
    }
  }, [timerIteration]);

  //Update number of completed pomodoros in the task
  useEffect(() => {
    onChangePomodorosCompleted(currentTask.id, completedPomodoros);
  }, [onChangePomodorosCompleted, currentTask.id, completedPomodoros]);

  //Mark as completed when all pomodoros in the task are completed
  useEffect(() => {
    if (
      currentTask.pomodoroNumber !== undefined &&
      completedPomodoros === currentTask.pomodoroNumber
    ) {
      onCompleteTask(currentTask.id);
      setPomodoroWasCompleted(true);
      setTimerIteration(0);
    }
  }, [
    onCompleteTask,
    completedPomodoros,
    currentTask.id,
    currentTask.pomodoroNumber,
  ]);

  //Make sure pomodoros completed are up to date
  useEffect(() => {
    onChangePomodorosCompleted(currentTask.id, completedPomodoros);
  }, [
    currentTask.isCompleted,
    onChangePomodorosCompleted,
    currentTask.id,
    completedPomodoros,
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

  //Hide message after 3 seconds and set default timer
  useEffect(() => {
    let timeout;
    if (pomodoroWasCompleted) {
      timeout = setTimeout(() => {
        setPomodoroWasCompleted(false);
        onMarkAsCurrent(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [pomodoroWasCompleted, onMarkAsCurrent]);

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
