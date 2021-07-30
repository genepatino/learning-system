import React from "react";
import { connect } from "react-redux";
import AppActions from "../../../../redux/reducers/appReducer";
import { useTranslation } from "react-i18next";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import apiUrl from "../../../utility/constantes/apiUrl";
import notification from "../../../utility/constantes/notification-message";
import { store } from "react-notifications-component";
import RadioButton from "../../../utility/components-utility/Radio-Button/index";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "../../../utility/components-utility/Select/index";
import Cookies from "universal-cookie";
import _ from "lodash";

import "animate.css";
import "./createUsers.scss";

const CreateUsers = ({ setOpenModal, getInformation }) => {
  const [t] = useTranslation("global");

  const cookies = new Cookies();

  const postUser = async (formData) => {
    try {
      const options = {
        method: "POST",
        headers: {
          Authorization: cookies.get("accessToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(`${apiUrl.apiUrlUser}/users`, options);
      const data = await response.json();

      let errField = [];
      let message;

      switch (data.code) {
        case 401:
          store.addNotification({
            ...notification,
            title: "Opps!",
            message: t("labels.authentication-error"),
            type: "warning",
          });
          break;

        case 422:
          _.find(data.data, function (err) {
            errField.push(err.field.toUpperCase() + ": " + err.message + ".");
            if (errField.length > 1) {
              message = `${t("labels.errors-message")} \n ${errField.join(
                " "
              )}`;
            } else {
              message = `${t("labels.error-message")} ${errField}`;
            }
          });

          store.addNotification({
            ...notification,
            title: "Opps!",
            message: message,
            type: "danger",
          });
          break;
        case 200:
        case 201:
          store.addNotification({
            ...notification,
            title: "Wonderful!!!",
            message: t("labels.success-message"),
            type: "success",
          });
          setOpenModal(false);
          getInformation();
          break;

        default:
          break;
      }
    } catch (err) {
      store.addNotification({
        ...notification,
        title: "Oh no!",
        message: t("labels.error-page"),
        type: "danger",
      });
    }
  };

  const formSchema = Yup.object({
    name: Yup.string().required(t("labels.field-required")),
    email: Yup.string()
      .email("invalid email")
      .required(t("labels.field-required")),
    gender: Yup.string().required(t("labels.field-required")),
    status: Yup.string().required(t("labels.field-required")),
  });

  return (
    <div className="form-container">
      <Formik
        initialValues={{ name: "", email: "", gender: "", status: "" }}
        validationSchema={formSchema}
        onSubmit={(formData) => {
          postUser(formData);
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <div className="title-input-bottom">
              <h2 className="h2-title">{t("labels.create-user")}</h2>
              <label className="label">{t("labels.enter-name")}</label>
              <Field
                name="name"
                label="ingresar nombre"
                type="text"
                className={classNames("input", {
                  "input-error": errors.name && t(errors.name) && touched.name,
                })}
              />
              <FontAwesomeIcon
                icon="exclamation-circle"
                className={classNames("icon", {
                  "icon-error": errors.name && touched.name,
                })}
              />
              <ErrorMessage component="div" name="name" className="error" />

              <label className="label">{t("labels.enter-email")}</label>

              <Field
                name="email"
                label="ingresar correo electrónico"
                type="text"
                className={classNames("input", {
                  "input-error":
                    errors.email && t(errors.email) && touched.email,
                })}
              />
              <FontAwesomeIcon
                icon="exclamation-circle"
                className={classNames("icon", {
                  "icon-error": errors.email && touched.email,
                })}
              />
              <ErrorMessage component="div" name="email" className="error" />

              <label className="label">{t("labels.enter-status")}</label>

              <Select />

              <ErrorMessage
                component="div"
                name="status"
                className="status-error"
              />

              <label className="label">{t("labels.enter-gender")}</label>

              <div className="container-gender ">
                <RadioButton label={t("labels.status-female")} value="Female" />
                <RadioButton label={t("labels.status-male")} value="Male" />
              </div>

              <ErrorMessage
                component="div"
                name="gender"
                className="gender-error"
              />
            </div>

            <div className="button">
              <button type="submit" className="button-two">
                {t("labels.add-user")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenModal: (openModal) => dispatch(AppActions.setOpenModal(openModal)),
  };
};

export default connect(null, mapDispatchToProps)(CreateUsers);
