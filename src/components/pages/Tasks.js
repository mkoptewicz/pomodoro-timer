import { Link, useRouteMatch } from "react-router-dom";
import Task from "../Task";
import "./Tasks.css";

const Tasks = () => {
  const match = useRouteMatch();
  return (
    <>
      <h2>Tasks</h2>
      <h3>Active tasks</h3>
      <div className="task-container">
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
      <Link to={`${match.url}/addTask`}>
        <button className="button">Add task</button>
      </Link>
    </>
  );
};

export default Tasks;
