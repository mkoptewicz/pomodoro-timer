import { ReactComponent as Check } from "../icons/check.svg";
import { ReactComponent as Play } from "../icons/play.svg";
import { ReactComponent as Edit } from "../icons/edit.svg";
import { ReactComponent as Delete } from "../icons/delete.svg";

import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import TasksContext from "../contexts/tasks-context";
import "./Task.css";

const Task = ({
  id,
  title,
  pomodoroNumber,
  pomodoroTimeInSeconds,
  pomodorosCompleted,
}) => {
  const { tasks, onRemoveTask, onMarkAsCurrent } = useContext(TasksContext);

  const history = useHistory();

  const playClickHandler = id => {
    const task = tasks.find(task => task.id === id);
    if (!task || task.isCompleted) {
      return;
    }
    onMarkAsCurrent(id);
    history.push("/");
  };

  return (
    <div className="task">
      <button
        to={"/"}
        onClick={() => playClickHandler(id)}
        className="button-timer"
        aria-label="Start working on this task"
      >
        <Play />
      </button>
      <h3>{title}</h3>
      <button className="button-status" aria-label="Mark as completed">
        <Check />
      </button>
      <Link to={`tasks/addTask/${id}`} aria-label="Edit">
        <Edit />
      </Link>
      <button
        onClick={() => onRemoveTask(id)}
        className="button-delete"
        aria-label="Delete"
      >
        <Delete />
      </button>
      <p>{Math.round(pomodoroTimeInSeconds / 60)} min</p>
      <div className="completed">
        {pomodorosCompleted}/{pomodoroNumber}
      </div>
    </div>
  );
};

export default Task;
