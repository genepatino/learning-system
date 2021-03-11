import React, { useState } from "react";
import { connect } from "react-redux";
import AppActions from "../../../../redux/reducers/appReducer";
import { withRouter } from "react-router";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../../utility/components-utility/FontAwesomeIcon/index";
import "./closeSesion.scss";

const CloseSesion = ({
  history,
  activeSesion,
  setActiveSesion,
  setActiveCategory,
  setActiveItem,
}) => {
  const [t, i18n] = useTranslation("global");
  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLanguage = () => {
    if (language === "es") {
      setLanguage("en");
      i18n.changeLanguage("en");
    } else {
      setLanguage("es");
      i18n.changeLanguage("es");
    }
  };

  const handleClick = () => {
    setActiveSesion(!activeSesion);
  };

  const handleCloseSesion = () => {
    history.push("/");
    setActiveSesion(!activeSesion);
    setActiveItem(null);
    setActiveCategory(null);
  };
  const nameUser = "Génesis Patiño";

  const name = nameUser.split(" ", 2);
  const firstName = name[0][0];
  let lastName = "";

  if (name[1]) {
    lastName = name[1][0];
  }

  const wordName = (firstName + lastName).toUpperCase();

  return (
    <div className="user-container">
      <div
        className={classNames("login-out", { loginActive: activeSesion })}
        onClick={handleClick}
      >
        <div className="logo-name-user">
          <span className="logo-user">{wordName}</span>

          <span className="user-name">{name[0]}</span>
        </div>
        <span className="user-icon-point">
          <FontAwesomeIcon className="icon" icon="ellipsis-h" />
        </span>
      </div>
      <div
        className={classNames("deployment-sesion", { active: activeSesion })}
      >
        <div className="information-user">
          <h3 className="name-sesion">{nameUser}</h3>
          <p className="admi">{t("labels.administrator")}</p>
        </div>
        <div className="icon-language" onClick={handleChangeLanguage}>
          <FontAwesomeIcon className="icon" icon="globe-americas" />
          <span className="close-span-sesion">
            {t("labels.change-language")}
          </span>
        </div>
        <div className="icon-close" onClick={handleCloseSesion}>
          <FontAwesomeIcon className="icon-user" icon="sign-out-alt" />
          <span className="close-span-sesion">{t("labels.sign-off")}</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeSesion: state.appReducer.activeSesion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveSesion: (activeSesionValue) =>
      dispatch(AppActions.setActiveSesion(activeSesionValue)),
    setActiveCategory: (activeCategoryValue) =>
      dispatch(AppActions.setActiveCategory(activeCategoryValue)),
    setActiveItem: (activeItem) =>
      dispatch(AppActions.setActiveItem(activeItem)),
  };
};

const CloseSesionWithRouter = withRouter(CloseSesion);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CloseSesionWithRouter);
