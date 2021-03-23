import React from "react";
import { Field } from "formik";
import "./radioButton.scss";

const RadioButton = ({ value, label, checked }) => {
  return (
    <div role="group" aria-labelledby="my-radio-group" className="container-button">
      <label className=/* "container-radio-button"  */"radio">
        <Field
          type="radio"
          name="gender"
          value={value}
          className="hidden"
          
        />
      
      <span className="label"></span>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
