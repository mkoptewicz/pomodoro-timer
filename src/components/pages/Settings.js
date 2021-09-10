import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import SettingsContext from "../context/settings-contex";
import "./Settings.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    pomodoroMins: "25",
    pomodoroSecs: "00",
    shortBreakMins: "05",
    shortBreakSecs: "00",
    longBreakMins: "05",
    longBreakSecs: "00",
    longBreakInterval: 4,
  });

  const ctx = useContext(SettingsContext);
  const history = useHistory();

  const {
    pomodoroMins,
    pomodoroSecs,
    shortBreakMins,
    shortBreakSecs,
    longBreakMins,
    longBreakSecs,
    longBreakInterval,
  } = settings;

  const clickHandler = () => {
    history.push("/");
  };

  const submitSettingsHandler = e => {
    e.preventDefault();

    const pomodoroTimeInSeconds = pomodoroMins * 60 + parseInt(pomodoroSecs);
    const shortBreakTimeInSeconds =
      shortBreakMins * 60 + parseInt(shortBreakSecs);
    const longBreakTimeInSeconds = longBreakMins * 60 + parseInt(longBreakSecs);

    ctx.setSettings({
      pomodoroTimeInSeconds,
      shortBreakTimeInSeconds,
      longBreakTimeInSeconds,
      longBreakInterval,
    });
    clickHandler();
  };

  const settingsChangeHandler = e => {
    //remove padding for interval input and set it's value to number
    const value =
      e.target.name === "longBreakInterval"
        ? +e.target.value
        : e.target.value.padStart(2, "0");

    setSettings({
      ...settings,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <h2>Settings</h2>
      <form onSubmit={submitSettingsHandler} className="settings">
        <label>
          Pomodoro Time{" "}
          <div className="inputs-container">
            <input
              type="number"
              name="pomodoroMins"
              value={pomodoroMins}
              onChange={settingsChangeHandler}
              min="0"
              max="60"
            />
            :
            <input
              type="number"
              name="pomodoroSecs"
              value={pomodoroSecs}
              onChange={settingsChangeHandler}
              min="0"
              max="59"
            />
          </div>
        </label>
        <label>
          Short break Time:
          <div className="inputs-container">
            <input
              type="number"
              name="shortBreakMins"
              value={shortBreakMins}
              onChange={settingsChangeHandler}
              min="0"
              max="60"
            />{" "}
            :
            <input
              type="number"
              name="shortBreakSecs"
              value={shortBreakSecs}
              onChange={settingsChangeHandler}
              min="0"
              max="59"
            />
          </div>
        </label>
        <label>
          Long break Time:
          <div className="inputs-container">
            <input
              type="number"
              name="longBreakMins"
              value={longBreakMins}
              onChange={settingsChangeHandler}
              min="0"
              max="60"
            />{" "}
            :
            <input
              type="number"
              name="longBreakSecs"
              value={longBreakSecs}
              onChange={settingsChangeHandler}
              min="0"
              max="59"
            />
          </div>
        </label>
        <label>
          Long break interval:
          <div className="inputs-container">
            <input
              type="number"
              name="longBreakInterval"
              value={longBreakInterval}
              onChange={settingsChangeHandler}
              min="0"
              max="10"
            />
          </div>
        </label>
        <div className="button-container">
          <button className="button">Confirm</button>
          <button onClick={clickHandler} className="button button--cancel" type="button">
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default Settings;
