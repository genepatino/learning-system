import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const RequiredAuth = ({ Component }) => {
  const cookies = new Cookies();

  if (
    cookies.get("accessToken") ===
    "Bearer 60e77d6ad756a82358b8fbfa5c2b83809e220132927ccae4c70dd89b9acd6279"
  ) {
    return <Component />;
  }
  return <Redirect to="/" />;
};

export default RequiredAuth;
