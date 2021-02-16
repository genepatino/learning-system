import React from "react";
import { connect } from "react-redux";
import AppActions from "../../redux/reducers/appReducer";
import { useTranslation } from "react-i18next";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import apiUrl from "../utility/constantes/apiUrl";
import { store } from "react-notifications-component";
import Error from "../Error/index";
import _ from "lodash";
import classNames from "classnames";
import "animate.css";

import "./createUsers.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateUsers = ({ error, setError }) => {
  const [t] = useTranslation("global");

  const postUser = async (formData) => {
    try {
      const options = {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 6f2859c486ff0b618a75d36512e09b61671b00e3b40fc6a9ab305a0c04cb6b4c",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(`${apiUrl}/users`, options);
      const data = await response.json();
      console.log(data);
      let eField = [];
      let message;

      switch (data.code) {
        case 401:
          store.addNotification({
            title: "Opps!",
            message: "Error de autenticación",
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__bounceIn"],
            animationOut: ["animate__animated", "animate__bounceOut"],
            dismiss: {
              duration: 15000,
              onScreen: true,
              pauseOnHover: true,
              showIcon: true,
            },
          });
          break;

        case 422:
          _.find(data.data, function (e) {
            eField.push(e.field.toUpperCase() + ": " + e.message + ".");
            if (eField > eField[0]) {
              message = `Se han presentado errores en los siguientes campos de información: \n ${eField.join(
                " "
              )}`;
            } else {
              message = `Se han presentado errores en el siguiente campo de información: ${eField}`;
            }
          });

          store.addNotification({
            title: "Opps!",
            message: message,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__bounceIn"],
            animationOut: ["animate__animated", "animate__bounceOut"],
            dismiss: {
              duration: 15000,
              onScreen: true,
              pauseOnHover: true,
              showIcon: true,
            },
          });
          break;
        case 201:
          store.addNotification({
            title: "Wonderful!!!",
            message: "El nuevo usuario se ha creado perfectamente",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__bounceIn"],
            animationOut: ["animate__animated", "animate__bounceOut"],
            dismiss: {
              duration: 15000,
              onScreen: true,
              pauseOnHover: true,
              showIcon: true,
            },
          });
          break;

        default:
          break;
      }
    } catch (err) {
      setError(true);
    }
  };

  const formSchema = Yup.object({
    name: Yup.string().required(t("labels.field-required")),
    email: Yup.string().email().required(t("labels.field-required")),
    gender: Yup.string().required(t("labels.field-required")),
    status: Yup.string().required(t("labels.field-required")),
  });

  return (
    <div
      className={classNames("form-container", {
        "container-white": error,
      })}
    >
      {error ? (
        <div className="error">
          <Error />
        </div>
      ) : (
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
                <h2 className="h2-title">{t("labels.create-new-user")}</h2>
                <label className="label">{t("labels.enter-name")}</label>
                <Field
                  name="name"
                  label="ingresar nombre"
                  type="text"
                  className={classNames("input", {
                    "input-error": errors.name && touched.name,
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
                    "input-error": errors.email && touched.email,
                  })}
                />
                <FontAwesomeIcon
                  icon="exclamation-circle"
                  className={classNames("icon", {
                    "icon-error": errors.email && touched.email,
                  })}
                />
                <ErrorMessage component="div" name="email" className="error" />

                <label className="label">{t("labels.enter-gender")}</label>
                <Field
                  name="gender"
                  label="ingresar género"
                  type="text"
                  className={classNames("input", {
                    "input-error": errors.gender && touched.gender,
                  })}
                />
                <FontAwesomeIcon
                  icon="exclamation-circle"
                  className={classNames("icon", {
                    "icon-error": errors.gender && touched.gender,
                  })}
                />
                <ErrorMessage component="div" name="gender" className="error" />

                <label className="label">{t("labels.enter-status")}</label>
                <Field
                  name="status"
                  label="ingresar estado (activo/inactivo)"
                  type="text"
                  className={classNames("input", {
                    "input-error": errors.status && touched.status,
                  })}
                />

                <FontAwesomeIcon
                  icon="exclamation-circle"
                  className={classNames("icon", {
                    "icon-error": errors.status && touched.status,
                  })}
                />
                <ErrorMessage component="div" name="status" className="error" />
              </div>
              <div className="button">
                <button type="submit" className="enviar">
                  {t("labels.add-user")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    error: state.appReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setError: (error) => dispatch(AppActions.setError(error)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateUsers);
