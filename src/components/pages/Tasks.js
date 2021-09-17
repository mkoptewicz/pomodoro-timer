import { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import TasksContext from "../../contexts/tasks-context";
import Task from "../Task";
import "./Tasks.css";

const Tasks = () => {
  const match = useRouteMatch();

  const tasksCtx = useContext(TasksContext);

  return (
    <>
      <h2>Tasks</h2>
      <h3>Click the play button to select current task</h3>
      <div className="task-container">
        {tasksCtx.tasks.map(task => (
          <Task key={task.id} {...task} />
        ))}
      </div>
      <Link to={`${match.url}/addTask`} className="button">
        Add task
      </Link>
      <button
        onClick={tasksCtx.onRemoveAllTasks}
        className="button button--remove"
      >
        Remove all
      </button>
    </>
  );
};

export default Tasks;
