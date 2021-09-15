import { ReactComponent as Check } from "../icons/check.svg";
import { ReactComponent as Play } from "../icons/play.svg";
import { ReactComponent as Edit } from "../icons/edit.svg";
import { ReactComponent as Delete } from "../icons/delete.svg";
import "./Task.css";
const Task = ({ title, pomodoroNumber, pomodoroTimeInSeconds }) => {
  return (
    <div className="task">
      <button className="button-timer">
        <Play />
      </button>
      <h3>{title}</h3>
      <button className="button-status">
        <Check />
      </button>
      <button className="button-edit">
        <Edit />
      </button>
      <button className="button-delete">
        <Delete />
      </button>
      <p>{Math.round(pomodoroTimeInSeconds / 60)} min</p>
      <div className="completed">0/{pomodoroNumber}</div>
    </div>
  );
};

export default Task;
