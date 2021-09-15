import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SettingsContextProvider } from "./contexts/settings-contex";
import { TasksContextProvider } from "./contexts/tasks-context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsContextProvider>
        <TasksContextProvider>
          <App />
        </TasksContextProvider>
      </SettingsContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
