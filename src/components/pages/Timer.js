import "./Timer.css";

const Timer = ({workTime}) => {
  return (
    <>
      <h1>Timer</h1>
      <div class="circle">
        <svg width="200" height="200" class="circle__svg">
          <circle
            cx="100"
            cy="100"
            r="96"
            class="circle__progress circle__progress--path"
          ></circle>
          <circle
            cx="100"
            cy="100"
            r="96"
            class="circle__progress circle__progress--fill"
          ></circle>
        </svg>

        <div class="timer">
          <span>00:00</span>
        </div>
      </div>
    </>
  );
};

export default Timer;
