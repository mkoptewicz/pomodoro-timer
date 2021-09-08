import { Switch, Route } from "react-router-dom";

import "./App.css";

import Layout from "./components/Layout";

function App() {
  return (
    <div className="app">
      <Layout />
      <Switch></Switch>
    </div>
  );
}

export default App;
