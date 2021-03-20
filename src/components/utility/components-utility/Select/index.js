import React from "react";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import "./select.scss";

const Select = () => {
  const [t] = useTranslation("global");
  return (
    <Field component="select" name="status" className="select-is-rounded">
      <option value="">{t("labels.select")}</option>
      <option value="Active">{t("labels.option-active")}</option>
      <option value="Inactive">{t("labels.option-inactive")}</option>
    </Field>
  );
};

export default Select;
