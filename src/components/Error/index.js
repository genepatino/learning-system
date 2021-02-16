import React from "react";

import imageError from "../../images/error.jpg";
import "./error.scss";

const Error = () => {
  return (
    <div className="container-error">
      <img className="image-error" src={imageError} alt="" />
    </div>
  );
};

export default Error;
