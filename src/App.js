import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import RequiredAuth from "./components/utility/RequiresAuth";

import "./styles/index.scss";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/admin"
          component={(props) => <RequiredAuth {...props} Component={Home} />}
        />
        <Route path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
