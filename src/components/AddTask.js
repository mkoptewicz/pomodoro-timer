import { useContext, useRef } from "react";
import { useHistory } from "react-router";
import "./AddTask.css";
import TasksContext from "./context/tasks-context";

const AddTask = () => {
  const tasksCtx = useContext(TasksContext);

  const history = useHistory();

  const titleRef = useRef();
  const pomodorosRef = useRef();

  const confirmHandler = (title, pomodorosNumber) => {
    if (!title) {
      return;
    }
    tasksCtx.addTaskHandler(title, pomodorosNumber);
    history.push("/tasks");
  };

  return (
    <>
      <div className="add-task">
        <label htmlFor="pomodoro-title">Title:</label>
        <input
          ref={titleRef}
          id="pomodoro-title"
          type="text"
          placeholder="Task title"
        />
        <label htmlFor="pomodoros">Pomodoros in the task:</label>
        <input
          ref={pomodorosRef}
          id="pomodoros"
          type="number"
          defaultValue="1"
          min="1"
        />
        <div className="button-container">
          <button
            onClick={() =>
              confirmHandler(titleRef.current.value, pomodorosRef.current.value)
            }
            className="button"
          >
            Confirm
          </button>
          <button className="button button--cancel">Cancel</button>
        </div>
      </div>
    </>
  );
};

export default AddTask;
