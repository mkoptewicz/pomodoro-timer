import React, { useState } from "react";

const SettingsContext = React.createContext({
  settings: {
    pomodoroMins: "25",
    shortBreakMins: "05",
    longBreakMins: "05",
    longBreakInterval: "4",
  },
  setSettings: () => {},
});
export const SettingsContextProvider = props => {
  const [settings, setSettings] = useState({
    pomodoroMins: "25",
    shortBreakMins: "05",
    longBreakMins: "05",
    longBreakInterval: "4",
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {props.children}
    </SettingsContext.Provider>
  );
};
export default SettingsContext;
