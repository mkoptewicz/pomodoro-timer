import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TasksContext = React.createContext([
  {
    id: uuidv4(),
    title: "Task 1",
    isCurrent: false,
    isCompleted: false,
    pomodoroNumber: 4,
    pomodoroTimeInSeconds: 10,
    shortBreakTimeInSeconds: 3,
    longBreakTimeInSeconds: 5,
    interval: 2,
  },
]);

export const TasksContextProvider = props => {
  const [tasks] = useState([
    {
      id: uuidv4(),
      title: "Task 1",
      isCurrent: true,
      isCompleted: false,
      pomodoroNumber: 2,
      pomodoroTimeInSeconds: 3,
      shortBreakTimeInSeconds: 2,
      longBreakTimeInSeconds: 5,
      interval: 2,
    },
    // {
    //   id: uuidv4(),
    //   title: "Task 2",
    //   isCurrent: false,
    //   isCompleted:false
    //   pomodoroNumber: 2,
    //   pomodoroTimeInSeconds: 10,
    //   shortBreakTimeInSeconds: 3,
    //   longBreakTimeInSeconds: 5,
    //   interval: 1,
    // },
  ]);

  return (
    <TasksContext.Provider value={tasks}>
      {props.children}
    </TasksContext.Provider>
  );
};
export default TasksContext;
