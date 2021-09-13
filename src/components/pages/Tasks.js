import Task from "../Task";
import "./Tasks.css"

const Tasks = () => {
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
      <h3>Completed tasks</h3>
    </>
  );
};

export default Tasks;
