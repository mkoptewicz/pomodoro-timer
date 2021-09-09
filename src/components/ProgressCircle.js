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
    <div class="circle">
      <svg width="200" height="200" class="circle__svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f42c04ff" />
            <stop offset="100%" stop-color="#006daaff" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="url(#gradient)"
          class="circle__progress circle__progress--path"
        ></circle>
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="url(#gradient)"
          class="circle__progress circle__progress--fill"
          style={fillStyle}
        ></circle>
      </svg>

      <div class="timer">
        <span>
          {formatedMinutes}:{formatedSeconds}
        </span>
      </div>
    </div>
  );
};

export default ProgressCircle;
