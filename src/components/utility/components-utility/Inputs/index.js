import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../FontAwesomeIcon";

import "./inputs.scss";

const Inputs = ({
  label,
  type,
  name,
  value,
  icon,
  placeholder,
  onChangeInput,
}) => {
  const handleInputChange = (e) => {
    onChangeInput(e.target.value);
  };

  return (
    <div className="form-group">
      <label className="label-enter">{label}</label>
      <input
        onChange={handleInputChange}
        placeholder={placeholder}
        className="form-input"
        type={type}
        name={name}
        value={value}
      ></input>
      {icon !== "" && <FontAwesomeIcon className="icon-password" icon={icon} />}
    </div>
  );
};

export default Inputs;
