import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";
import Inputs from "../utility/components-utility/Inputs/index";
import Button from "../utility/components-utility/Button/index";
import LoginActions from "../../redux/reducers/loginReducer";
import imageFrom from "../../images/fondo1.png";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";

import "../utility/components-utility/FontAwesomeIcon/index";
import classNames from "classnames";
import "./login.scss";

const Login = ({
  history,
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
}) => {
  const [t] = useTranslation("global");

  const expressions = {
    regexName: /^[A-z]\D{3,30}/g,
    regexEmail: /^[a-z][a-z0-9!"#$%&'()*+,\-./:;<=>?[\\\]^_`{|}~]+@[a-z]+\.[a-z]+$/g,
    regexPassword: /^[A-Z][A-z0-9!"#$%&'()*+,\-./:;<=>?[\\\]^_`{|}~\S]{8,30}/g,
  };
  const passwordUser = "Empanada06#";
  const emailUser = "gene_4185@hotmail.com";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !expressions.regexEmail.test(email) ||
      !expressions.regexPassword.test(password)
    ) {
      setError(
        "Los datos ingresados no son validos o faltan campos por rellenar"
      );
    } else if (emailUser === email && passwordUser === password) {
      const cookies = new Cookies();
      cookies.set(
        "accessToken",
        "Bearer 6f2859c486ff0b618a75d36512e09b61671b00e3b40fc6a9ab305a0c04cb6b4c",
        {
          path: "/",
          expires: new Date("Tue, 03 May 2022 10:30:00 GMT"),
        }
      );
      history.push("/admin");
      setError("");
    } else {
      setError("El correo o contraseña ingresados son incorrectos");
    }
  };

  return (
    <div className="container">
      <div className="container-two">
        <div className="container-image">
          <img className="imageFrom" src={imageFrom} alt="" />
        </div>

        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form">
              <h2
                className={classNames("h2-title", {
                  "h2-title-error": error !== "",
                })}
              >
                {t("titles.h2-title-login")}
              </h2>

              {error !== "" && (
                <div className="error">
                  <FontAwesomeIcon
                    className="icon-error"
                    icon="exclamation-circle"
                  />
                  <span className="message-error">
                    <b>{error}</b>
                  </span>
                </div>
              )}

              <Inputs
                label={t("labels.email")}
                type="email"
                name="email"
                value={email}
                onChangeInput={setEmail}
                icon=""
              />

              <Inputs
                label={t("labels.password")}
                type="password"
                name="password"
                value={password}
                onChangeInput={setPassword}
                icon="eye"
              />

              <div
                className={classNames("remember", {
                  "remember-error": error !== "",
                })}
              >
                <div className="input-remenber">
                  <label className="label-checkbox">
                    <Checkbox className="checkbox-style" />
                    <span className="connected">
                      {t("labels.stay-connected")}
                    </span>
                  </label>
                </div>
                <div className="link-remember">
                  <Link className="link" to="/">
                    {t("labels.forgot-password")}
                  </Link>
                </div>
              </div>
              <Button button={t("labels.log-in")} icon="" />

              <footer
                className={classNames("footer-container", {
                  "footer-container-error": error !== "",
                })}
              >
                <div className="footer-login">
                  <span className="inscribete">
                    {t("labels.new-organization")}
                  </span>

                  <Link className="link-register" to="/">
                    {t("labels.sign-up")}
                  </Link>
                </div>
              </footer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.loginReducer.email,
    password: state.loginReducer.password,
    error: state.loginReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEmail: (emailValue) => dispatch(LoginActions.setEmail(emailValue)),
    setPassword: (passwordValue) =>
      dispatch(LoginActions.setPassword(passwordValue)),
    setError: (errorValue) => dispatch(LoginActions.setError(errorValue)),
  };
};

const LoginWithRouter = withRouter(Login);
export default connect(mapStateToProps, mapDispatchToProps)(LoginWithRouter);
