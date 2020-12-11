import React from "react";
import { connect } from "react-redux";
import AppActions from "../../redux/reducers/appReducer";
import { withRouter } from "react-router";
import imageSesion from "../../images/imageSesion.jpg";
import "../FontAwesomeIcon";
import "./closeSesion.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CloseSesion = ({
  _match,
  _location,
  history,
  activeSesion,
  setActiveSesion,
  setActiveCategory,
  setActiveItem,
}) => {
  /* const [activeSesion, setActiveSesion] = useState(false); */

  const handleClick = () => {
    setActiveSesion(!activeSesion);
  };

  const handleCloseSesion = (e) => {
    window.localStorage.removeItem("USER_KEY");
    history.push("/");
    setActiveSesion(!activeSesion);
    setActiveItem(null);
    setActiveCategory(null);
  };

  return (
    <div className="user-container">
      <div
        className={classNames("login-out", { loginActive: activeSesion })}
        onClick={handleClick}
      >
        <div className="imag">
          <img className="image-sesion" src={imageSesion} width="50px" alt="" />
          <span className="user-name">Génesis</span>
        </div>
        <span className="user-icon-point">
          <FontAwesomeIcon className="icon" icon="ellipsis-h" />
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
