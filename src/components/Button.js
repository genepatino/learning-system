import React from "react";

import "../styles/button.scss";

const Button = ({ button }) => {
  const handleClick = (e) => {};

  return (
    <button onClick={handleClick} className="button_central">
      {button}
    </button>
  );
};

export default Button;
