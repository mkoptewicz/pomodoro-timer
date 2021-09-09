import { Switch, Route } from "react-router-dom";

import "./App.css";

import Layout from "./components/Layout";
import Timer from "./components/pages/Timer";
import Tasks from "./components/pages/Tasks";
import Settings from "./components/pages/Settings";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <div className="app">
      <Layout />
      <Switch>
        <Route path="/" exact>
          <Timer />
        </Route>
        <Route path="/tasks">
          <Tasks />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
