import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/FontAwesomeIcon";

import "../styles/inputs.scss";

const Inputs = ({ label, type, name, value, icon, onChangeInput }) => {
  const handleInputChange = (e) => {
    onChangeInput(e.target.value);
  };

  return (
    <div className="form-group">
      <label className="label_enter">{label}</label>
      <input
        onChange={handleInputChange}
        className="form_input"
        type={type}
        name={name}
        value={value}
      ></input>
      {icon !== "" && <FontAwesomeIcon className="icon_password" icon={icon} />}
    </div>
  );
};

export default Inputs;
