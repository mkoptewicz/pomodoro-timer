import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import SettingsContext from "../../contexts/settings-contex";
import formatTimeInput from "../../lib/formatTimeInput";
import "./Settings.css";

const Settings = () => {
  const ctx = useContext(SettingsContext);
  const {
    pomodoroMins,
    pomodoroSecs,
    shortBreakMins,
    shortBreakSecs,
    longBreakMins,
    longBreakSecs,
    longBreakInterval,
  } = ctx.settings;

  const [settings, setSettings] = useState({
    pomodoroMins,
    pomodoroSecs,
    shortBreakMins,
    shortBreakSecs,
    longBreakMins,
    longBreakSecs,
    longBreakInterval,
  });

  const history = useHistory();

  const clickHandler = () => {
    history.push("/");
  };

  const submitSettingsHandler = e => {
    e.preventDefault();

    ctx.setSettings({
      ...settings,
    });
    clickHandler();
  };

  const settingsChangeHandler = e => {
    //remove padding and change max number for interval input
    const value =
      e.target.name === "longBreakInterval"
        ? formatTimeInput(e.target.value, 10, 1)
        : formatTimeInput(e.target.value, 59, 2);

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
          Pomodoro
          <div className="inputs-container">
            <input
              type="number"
              name="pomodoroMins"
              value={settings.pomodoroMins}
              onChange={settingsChangeHandler}
              min="0"
              max="60"
            />
            :
            <input
              type="number"
              name="pomodoroSecs"
              value={settings.pomodoroSecs}
              onChange={settingsChangeHandler}
              min="0"
              max="59"
            />
          </div>
        </label>
        <label>
          Short break:
          <div className="inputs-container">
            <input
              type="number"
              name="shortBreakMins"
              value={settings.shortBreakMins}
              onChange={settingsChangeHandler}
              min="0"
              max="60"
            />
            :
            <input
              type="number"
              name="shortBreakSecs"
              value={settings.shortBreakSecs}
              onChange={settingsChangeHandler}
              min="0"
              max="59"
            />
          </div>
        </label>
        <label>
          Long break:
          <div className="inputs-container">
            <input
              type="number"
              name="longBreakMins"
              value={settings.longBreakMins}
              onChange={settingsChangeHandler}
              min="0"
              max="60"
            />
            :
            <input
              type="number"
              name="longBreakSecs"
              value={settings.longBreakSecs}
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
              value={settings.longBreakInterval}
              onChange={settingsChangeHandler}
              min="0"
              max="10"
            />
          </div>
        </label>
        <div className="button-container">
          <button className="button">Confirm</button>
          <button
            onClick={clickHandler}
            className="button button--cancel"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default Settings;
