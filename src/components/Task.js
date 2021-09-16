import { ReactComponent as Check } from "../icons/check.svg";
import { ReactComponent as Play } from "../icons/play.svg";
import { ReactComponent as Edit } from "../icons/edit.svg";
import { ReactComponent as Delete } from "../icons/delete.svg";

import { Link } from "react-router-dom";
import { useContext } from "react";
import TasksContext from "../contexts/tasks-context";
import "./Task.css";

const Task = ({ id, title, pomodoroNumber, pomodoroTimeInSeconds }) => {
  const { removeTaskHandler, markAsCurrentHandler } = useContext(TasksContext);

  return (
    <div className="task">
      <Link
        to={"/"}
        onClick={() => markAsCurrentHandler(id)}
        className="button-timer"
      >
        <Play />
      </Link>
      <h3>{title}</h3>
      <button className="button-status">
        <Check />
      </button>
      <Link to={`tasks/addTask/${id}`}>
        <Edit />
      </Link>
      <button onClick={() => removeTaskHandler(id)} className="button-delete">
        <Delete />
      </button>
      <p>{Math.round(pomodoroTimeInSeconds / 60)} min</p>
      <div className="completed">0/{pomodoroNumber}</div>
    </div>
  );
};

export default Task;
