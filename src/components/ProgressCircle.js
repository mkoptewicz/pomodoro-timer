import formatTimeInput from "../lib/formatTimeInput";
import "./ProgressCircle.css";

const ProgressCircle = ({ timeInSeconds }) => {
  const radius = 96;
  const pathLength = 2 * Math.PI * radius;
  const fillStyle = {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  };
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formatedMinutes = formatTimeInput(minutes);
  const formatedSeconds = formatTimeInput(seconds);
  return (
    <div className="circle">
      <svg width="200" height="200" className="circle__svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f42c04ff" />
            <stop offset="100%" stopColor="#006daaff" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="url(#gradient)"
          className="circle__progress circle__progress--path"
        ></circle>
        <circle
          cx="100"
          cy="100"
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
