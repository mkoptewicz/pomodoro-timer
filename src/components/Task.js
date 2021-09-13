import { ReactComponent as Check } from "../icons/check.svg";
import { ReactComponent as Play } from "../icons/play.svg";
import { ReactComponent as Edit } from "../icons/edit.svg";
import { ReactComponent as Delete } from "../icons/delete.svg";
import "./Task.css";
const Task = () => {
  return (
    <div className="task">
      <button className="button-timer">
        <Play />
      </button>
      <h3>Task title but very long</h3>
      <button className="button-status">
        <Check />
      </button>
      <button className="button-edit">
        <Edit />
      </button>
      <button className="button-delete">
        <Delete />
      </button>
      <p>25 min</p>
      <div className="completed">0/4</div>
    </div>
  );
};

export default Task;
