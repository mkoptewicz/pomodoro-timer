import formatTimeInput from "../lib/formatTimeInput";
import "./ProgressCircle.css";

const ProgressCircle = ({ timeInSeconds, elapsedTimeInSeconds }) => {
  const radius = 100;
  const pathLength = 2 * Math.PI * radius;
  const passedTimeInPercent = elapsedTimeInSeconds / timeInSeconds;
  const dashoffset = pathLength - pathLength * passedTimeInPercent;

  const fillStyle = {
    strokeDasharray: pathLength,
    strokeDashoffset: dashoffset,
  };
  const timeLeftInSeconds = timeInSeconds - elapsedTimeInSeconds;
  const minutes = Math.floor(timeLeftInSeconds / 60);
  const seconds = Math.floor(timeLeftInSeconds % 60);
  const formatedMinutes = formatTimeInput(minutes);
  const formatedSeconds = formatTimeInput(seconds);

  return (
    <div className="circle">
      <svg width="220" height="220" className="circle__svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f42c04ff" />
            <stop offset="100%" stopColor="#006daaff" />
          </linearGradient>
        </defs>
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="url(#gradient)"
          className="circle__progress circle__progress--path"
        ></circle>
        <circle
          cx="110"
          cy="110"
          r={radius}
          stroke="url(#gradient)"
          className="circle__progress circle__progress--fill"
          style={fillStyle}
        ></circle>
      </svg>

      <div className="timer">
        <span>
          {formatedMinutes}:{formatedSeconds}
        </span>
      </div>
    </div>
  );
};

export default ProgressCircle;
