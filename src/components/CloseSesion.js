import React, { useState } from "react";
import { withRouter } from "react-router";
import imageSesion from "../images/imageSesion.jpg";
import "../components/FontAwesomeIcon";
import "../styles/home.scss";
import "../styles/closeSesion.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CloseSesion = ({ _match, _location, history }) => {
  const [activeSesion, setActiveSesion] = useState(false);

  const handleClick = () => {
    setActiveSesion(!activeSesion);
  };

  const handleCloseSesion = (e) => {
    window.localStorage.removeItem("USER_KEY");
    history.push("/");
  };

  return (
    <div className="user-container">
      <div className={classNames("login-out", { loginActive: activeSesion })}>
        <div className="imag">
          <img className="image-sesion" src={imageSesion} width="50px" alt="" />
          <span className="user-name">Génesis</span>
        </div>
        <span className="user_icon_point">
          <FontAwesomeIcon
            onClick={handleClick}
            className="icon"
            icon="ellipsis-h"
          />
        </span>
      </div>
      <div
        className={classNames("deployment-sesion", { active: activeSesion })}
      >
        <div className="information-user">
          <h3 className="name-sesion">Génesis Patiño</h3>
          <p className="admi">Administrador</p>
        </div>
        <div className="icon-close" onClick={handleCloseSesion}>
          <FontAwesomeIcon className="icon-user" icon="sign-out-alt" />
          <span className="close-span-sesion">Cerrar sesion</span>
        </div>
      </div>
    </div>
  );
};

const CloseSesionWithRouter = withRouter(CloseSesion);
export default CloseSesionWithRouter;
