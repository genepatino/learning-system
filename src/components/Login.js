import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import LoginActions from "../redux/reducers/loginReducer";
import "../components/FontAwesomeIcon";
import "../styles/login.scss";
import imageFrom from "../images/imagenCentral.png";

const Login = ({
  _match,
  _location,
  history,
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
}) => {
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
      window.localStorage.setItem("USER_KEY", "0246");
      history.push("/home");
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
              <h2 className="h2-title">Iniciar sesión</h2>
              {error !== "" && (
                <div className="error">
                  <FontAwesomeIcon
                    className="icon_error"
                    icon="exclamation-circle"
                  />
                  <span className="message_error">
                    <b>{error}</b>
                  </span>
                </div>
              )}

              <Inputs
                label="Correo electrónico"
                type="email"
                name="email"
                value={email}
                onChangeInput={setEmail}
                icon=""
              />

              <Inputs
                label="Contraseña"
                type="password"
                name="password"
                value={password}
                onChangeInput={setPassword}
                icon="eye"
              />

              <div className="remember">
                <div className="input-remenber">
                  <label className="label-checkbox">
                    <Checkbox className="checkbox-style" />
                    <span className="connected">Mantenerme conectado</span>
                  </label>
                </div>
                <div className="link-remember">
                  <Link className="link" to="/">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>
              <Button button="Iniciar sesión" />

              <footer className="footer-container">
                <div className="footer-login">
                  <span className="inscribete">
                    ¿Eres una organización nueva?
                  </span>

                  <Link className="link-register" to="/">
                    Inscríbete aquí
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
