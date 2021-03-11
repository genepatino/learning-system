import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const RequiredAuth = ({ Component }) => {
  const cookies = new Cookies();

  if (
    cookies.get("accessToken") ===
    "Bearer 6f2859c486ff0b618a75d36512e09b61671b00e3b40fc6a9ab305a0c04cb6b4c"
  ) {
    return <Component />;
  }
  return <Redirect to="/" />;
};

export default RequiredAuth;
