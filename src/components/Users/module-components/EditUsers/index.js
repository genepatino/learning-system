import React from "react";
import AppActions from "../../../../redux/reducers/appReducer";
import { connect } from "react-redux";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";
import apiUrl from "../../../utility/constantes/apiUrl";
import Select from "../../../utility/components-utility/Select/index";
import notification from "../../../utility/constantes/notification-message";
import { store } from "react-notifications-component";

import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./editUsers.scss";

const EditUsers = ({ editUser, setOpenModal, getInformation }) => {
  const [t] = useTranslation("global");

  const cookies = new Cookies();

  const editUsersList = async (editSingleUser) => {
    try {
      const configObject = {
        method: "PATCH",
        headers: {
          Authorization: cookies.get("accessToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editSingleUser),
      };
      const response = await fetch(
        `${apiUrl}/users/${editUser.id}`,
        configObject
      );
      const data = await response.json();

      switch (data.code) {
        case 401:
          store.addNotification({
            ...notification,
            title: "Opps!",
            message: t("labels.authentication-error"),
            type: "warning",
          });
          break;

        case 200:
        case 201:
          store.addNotification({
            ...notification,
            title: "Wonderful!!!",
            message: "su usuario ha sido actualizado con éxito (trad)",
            type: "success",
          });
          setOpenModal(false);
          getInformation();

          break;

        default:
          break;
      }
    } catch (err) {
      console.error(err);
      store.addNotification({
        ...notification,
        title: "Oh no!",
        message: t("labels.error-page"),
        type: "danger",
      });
    }
  };

  const formSchema = Yup.object({
    name: Yup.string().required(t("labels.field-required")).min(5),
    email: Yup.string()
      .email("invalid email")
      .required(t("labels.field-required")),
    status: Yup.string().required(t("labels.field-required")),
  });

  return (
    <div className="form-container">
      <Formik
        initialValues={{
          name: editUser.name,
          email: editUser.email,
          status: editUser.status,
        }}
        validationSchema={formSchema}
        onSubmit={(formData) => {
          editUsersList(formData);
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <div className="title-input-bottom">
              <h2 className="h2-title">{t("labels.edit-user")}</h2>
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
            </div>
            <div className="button">
              <button type="submit" className="button-two">
                {t("labels.update-user")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    editUser: state.appReducer.editUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenModal: (openModal) => dispatch(AppActions.setOpenModal(openModal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUsers);
