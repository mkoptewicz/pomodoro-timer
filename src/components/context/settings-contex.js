import React, { useState } from "react";

const SettingsContext = React.createContext({
  settings: {
    pomodoroTimeInSeconds: 60,
    shortBreakTimeInSeconds: 5,
    longBreakTimeInSeconds: 15,
    longBreakIntervalInSeconds: 3,
  },
  setSettings: () => {},
});
export const SettingsContextProvider = props => {
  const [settings, setSettings] = useState({
    pomodoroTimeInSeconds: 60,
    shortBreakTimeInSeconds: 5,
    longBreakTimeInSeconds: 15,
    longBreakInterval: 3,
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {props.children}
    </SettingsContext.Provider>
  );
};
export default SettingsContext;
