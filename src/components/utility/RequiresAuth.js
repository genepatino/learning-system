import React from "react";
import { Redirect } from "react-router-dom";

const RequiredAuth = ({ Component }) => {
  if (window.localStorage.getItem("USER_KEY") === "0246") {
    return <Component />;
  }
  return <Redirect to="/" />;
};

export default RequiredAuth;
