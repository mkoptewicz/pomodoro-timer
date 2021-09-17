import { useContext } from "react";
import ProgressCircle from "../ProgressCircle";
import ControlButtons from "../ControlButtons";
import TasksContext from "../../contexts/tasks-context";
import "./Timer.css";
import Task from "../Task";

const Timer = ({
  timeInSeconds,
  elapsedTimeInSeconds,
  isRunning,
  isPaused,
  onStart,
  onStop,
  onPause,
  onContinue,
  pomodoroWasCompleted,
}) => {
  const { tasks } = useContext(TasksContext);
  const currentTask = tasks.find(task => task.isCurrent);

  return (
    <>
      {currentTask && (
        <Task {...currentTask}  />
      )}
      {!currentTask && <h1>Timer</h1>}
      {pomodoroWasCompleted && (
        <p>Congrats! You've completed all the pomodoros in the task!</p>
      )}
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
