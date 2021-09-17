import { useContext, useRef } from "react";
import { useHistory, useParams } from "react-router";
import "./AddTask.css";
import TasksContext from "../contexts/tasks-context";

const AddTask = () => {
  const { tasks, onEditTask, onAddTask } = useContext(TasksContext);

  const history = useHistory();
  const { taskId } = useParams();
  const titleRef = useRef();
  const pomodorosRef = useRef();

  const currentTask = tasks.find(task => task.id === taskId);

  const confirmHandler = (title, pomodoroNumber) => {
    if (!title) {
      return;
    }
    //Use url to determine weather it's edit mode or new task
    currentTask
      ? onEditTask(taskId, title, pomodoroNumber)
      : onAddTask(title, pomodoroNumber);
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
          defaultValue={currentTask?.title || "Task Title"}
        />
        <label htmlFor="pomodoros">Pomodoros in the task:</label>
        <input
          ref={pomodorosRef}
          id="pomodoros"
          type="number"
          defaultValue={currentTask?.pomodoroNumber || "1"}
          min="1"
        />
        <div className="button-container">
          <button
            onClick={() =>
              confirmHandler(
                titleRef.current.value,
                +pomodorosRef.current.value
              )
            }
            className="button"
          >
            Confirm
          </button>
          <button
            onClick={() => history.push("/tasks")}
            className="button button--cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTask;
