import React, { useState } from "react";

const SettingsContext = React.createContext({
  settings: {
    pomodoroMins: "25",
    pomodoroSecs: "00",
    shortBreakMins: "05",
    shortBreakSecs: "00",
    longBreakMins: "05",
    longBreakSecs: "00",
    longBreakInterval: "4",
  },
  setSettings: () => {},
});
export const SettingsContextProvider = props => {
  const [settings, setSettings] = useState({
    pomodoroMins: "25",
    pomodoroSecs: "00",
    shortBreakMins: "05",
    shortBreakSecs: "00",
    longBreakMins: "05",
    longBreakSecs: "00",
    longBreakInterval: "4",
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {props.children}
    </SettingsContext.Provider>
  );
};
export default SettingsContext;
