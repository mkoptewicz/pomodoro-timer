import "./ControlButtons.css";

const ControlButtons = ({
  isRunning,
  isPaused,
  onStart,
  onStop,
  onPause,
  onContinue,
}) => {
  return (
    <div className="control-buttons">
      {!isRunning && !isPaused && (
        <button onClick={onStart} className="button button--wide">
          Start
        </button>
      )}
      {isRunning && (
        <button onClick={onStop} className="button">
          Stop
        </button>
      )}
      {isRunning && (
        <button onClick={onPause} className="button">
          Pause
        </button>
      )}
      {isPaused && (
        <button onClick={onContinue} className="button button--wide">
          Continue
        </button>
      )}
    </div>
  );
};

export default ControlButtons;
