import React from "react";

import "./button.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ button, icon, onClick }) => {
  return (
    <button className="button-central" onClick={onClick}>
      <div className="button-container">
        {icon !== "" && <FontAwesomeIcon className="icon" icon={icon} />}
        {button}
      </div>
    </button>
  );
};

export default Button;
