import getCurrentIndex from "./getCurrentIndex";



const getCurrentTimer = (task, timerIteration) => {
  const {
    pomodoroTimeInSeconds,
    shortBreakTimeInSeconds,
    longBreakTimeInSeconds,
    interval,
  } = task;

  const timersTemplate = [
    pomodoroTimeInSeconds,
    shortBreakTimeInSeconds,
    longBreakTimeInSeconds,
    interval,
  ];
  const currentTimerIndex = getCurrentIndex(timerIteration, +interval);
  const currentTime = timersTemplate[currentTimerIndex];
  return currentTime;
};
export default getCurrentTimer;
