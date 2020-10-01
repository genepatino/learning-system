import React from "react";

import "./button.scss";

const Button = ({ button }) => {
  const handleClick = (e) => {};

  return (
    <button onClick={handleClick} className="button-central">
      {button}
    </button>
  );
};

export default Button;
