const templateTimers = tasksArray => {
  const timers = tasksArray.map((task) => {
    const singleTaskTimers = [];
    for (let i = 1; i <= task.pomodoroNumber; i++) {
      const breakTime =
        i % task.interval === 0
          ? task.longBreakTimeInSeconds
          : task.shortBreakTimeInSeconds;
      singleTaskTimers.push(task.pomodoroTimeInSeconds, breakTime);
    }
    return singleTaskTimers;
  });
  return timers;
};
export default templateTimers;
