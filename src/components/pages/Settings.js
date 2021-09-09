import "./Settings.css";
const Settings = () => {
  const setSettingsHandler = e => {
    e.preventDefault();
    console.log("set");
  };
  return (
    <>
      <h2>Settings</h2>
      <form onSubmit={setSettingsHandler} className="settings">
        <label>
          Pomodoro Time{" "}
          <div className="inputs-container">
            <input type="number" defaultValue="25" min="0" max="60" /> :
            <input type="number" defaultValue="00" min="0" max="60" />
          </div>
        </label>
        <label>
          Long break Time:
          <div className="inputs-container">
            <input type="number" defaultValue="05" min="0" max="60" /> :
            <input type="number" defaultValue="00" min="0" max="60" />
          </div>
        </label>
        <label>
          Short break Time:{" "}
          <div className="inputs-container">
            <input type="number" defaultValue="15" min="0" max="60" /> :
            <input type="number" defaultValue="00" min="0" max="60" />
          </div>
        </label>
        <label>
          Long break interval:{" "}
          <div className="inputs-container">
            <input type="number" defaultValue="4" min="0" max="10" />
          </div>
        </label>
        <div className="button-container">
          <button className="button">Confirm</button>
          <button className="button button--cancel" type="button">
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default Settings;
