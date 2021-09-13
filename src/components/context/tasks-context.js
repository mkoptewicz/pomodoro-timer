import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TasksContext = React.createContext([
  {
    id: uuidv4(),
    title: "Task 1",
    pomodoroNumber: 4,
    pomodoroTimeInSeconds: 10,
    shortBreakTimeInSeconds: 3,
    longBreakTimeInSeconds: 5,
    interval: 2,
  },
]);

export const TasksContextProvider = props => {
  const [tasks, setTasks] = useState([
    {
      id: uuidv4(),
      title: "Task 1",
      pomodoroNumber: 4,
      pomodoroTimeInSeconds: 10,
      shortBreakTimeInSeconds: 3,
      longBreakTimeInSeconds: 5,
      interval: 3,
    },
    {
      id: uuidv4(),
      title: "Task 2",
      pomodoroNumber: 2,
      pomodoroTimeInSeconds: 10,
      shortBreakTimeInSeconds: 3,
      longBreakTimeInSeconds: 5,
      interval: 1,
    },
  ]);

  return (
    <TasksContext.Provider value={tasks}>
      {props.children}
    </TasksContext.Provider>
  );
};
export default TasksContext;
