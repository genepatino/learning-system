import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import RequiredAuth from "./components/utility/RequiresAuth";
import ReactNotification from "react-notifications-component";

import "react-notifications-component/dist/theme.css";
import "./styles/index.scss";

function App() {
  return (
    <Fragment>
      <ReactNotification />
      <BrowserRouter>
        <Switch>
          <Route
            path="/admin"
            component={(props) => <RequiredAuth {...props} Component={Home} />}
          />
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
