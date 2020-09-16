import React from "react";

import "../styles/button.css";

const Button = ({ button }) => {
  const handleClick = (e) => {};

  return (
    <button onClick={handleClick} className="button_central">
      {button}
    </button>
  );
};

export default Button;
