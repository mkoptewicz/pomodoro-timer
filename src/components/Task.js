import { ReactComponent as Check } from "../icons/check.svg";
import { ReactComponent as Play } from "../icons/play.svg";
import { ReactComponent as Edit } from "../icons/edit.svg";
import { ReactComponent as Delete } from "../icons/delete.svg";

import { Link, useRouteMatch } from "react-router-dom";
import { useContext } from "react";
import TasksContext from "../contexts/tasks-context";
import "./Task.css";

const Task = ({ id, title, pomodoroNumber, pomodoroTimeInSeconds }) => {

  const match = useRouteMatch();
  const { removeTaskHandler } = useContext(TasksContext);

  return (
    <div className="task">
      <button className="button-timer">
        <Play />
      </button>
      <h3>{title}</h3>
      <button className="button-status">
        <Check />
      </button>
      <Link to={`${match.url}/addTask/${id}`}>
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
