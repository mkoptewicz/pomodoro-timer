const CurrentTaskInfo = ({ title, pomodorosCompleted, pomodoroNumber }) => {
  return (
    <>
      <h2>{title}</h2>
      <p>
        {pomodorosCompleted}/{pomodoroNumber}
      </p>
    </>
  );
};

export default CurrentTaskInfo;
