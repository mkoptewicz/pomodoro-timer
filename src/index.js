import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SettingsContextProvider } from "./components/context/settings-contex";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsContextProvider>
        <App />
      </SettingsContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
