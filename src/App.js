import { Switch, Route } from "react-router-dom";

import "./App.css";

import Nav from "./components/Nav";
import Timer from "./components/pages/Timer";
import Tasks from "./components/pages/Tasks";
import Settings from "./components/pages/Settings";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <div className="app">
      <Nav />
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
