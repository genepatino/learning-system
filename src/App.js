import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Logout from "./components/Home";
import RequiredAuth from "./components/utility/RequiresAuth";

import "./styles/index.scss";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/home" component={Home} /> */}
        <Route
          exact
          path="/home"
          component={(props) => <RequiredAuth {...props} Component={Home} />}
        />
        <Route exact path="/logout" component={Logout} />
        <Route path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
