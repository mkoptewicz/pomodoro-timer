import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SettingsContext from "./settings-contex";

const TasksContext = React.createContext({
  tasks: [
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
  ],
  addTaskHandler: () => {},
  editTaskHandler: () => {},
  removeTaskHandler: () => {},
  removeAllTasksHandler: () => {},
});

export const TasksContextProvider = props => {
  const [tasks, setTasks] = useState([
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
    {
      id: uuidv4(),
      title: "Task 2",
      isCurrent: false,
      isCompleted: false,
      pomodoroNumber: 2,
      pomodoroTimeInSeconds: 10,
      shortBreakTimeInSeconds: 3,
      longBreakTimeInSeconds: 5,
      interval: 1,
    },
  ]);
  const settingsCtx = useContext(SettingsContext);
  const { pomodoroMins, shortBreakMins, longBreakMins, longBreakInterval } =
    settingsCtx.settings;

  const addTaskHandler = (title, pomodoroNumber) => {
    const task = {
      id: uuidv4(),
      title,
      isCurrent: false,
      isCompleted: false,
      pomodoroNumber,
      pomodoroTimeInSeconds: pomodoroMins * 60,
      shortBreakTimeInSeconds: shortBreakMins * 60,
      longBreakTimeInSeconds: longBreakMins * 60,
      interval: longBreakInterval,
    };
    setTasks([...tasks, task]);
  };
  const editTaskHandler = (id, title, pomodoroNumber) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, title, pomodoroNumber };
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  const removeTaskHandler = id => {
    const updatedTasks = [...tasks].filter(task => task.id !== id);
    setTasks(updatedTasks);
  };
  const removeAllTasksHandler = () => setTasks([]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTaskHandler,
        editTaskHandler,
        removeTaskHandler,
        removeAllTasksHandler,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};
export default TasksContext;
