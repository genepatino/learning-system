import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, Switch, Link } from "react-router-dom";
import AppActions from "../../redux/reducers/appReducer";
import Categorias from "../Categorias/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloseSesion from "../CloseSesion/index";
import NotesView from "../NotesView/index";
import "../FontAwesomeIcon";
import "./home.scss";

const Home = ({
  location,
  activeCategory,
  menuData,
  setActiveCategory,
  setActiveItem,
  setActiveSesion,
}) => {
  const handleClickLogo = () => {
    setActiveItem(null);
    setActiveCategory(null);
    setActiveSesion(false);
  };

  return (
    <div className="container-homeTwo">
      <div className="home-menu">
        <div className="home-categorias">
          <Link className="logo-home" to="/admin" onClick={handleClickLogo}>
            <FontAwesomeIcon className="logo" icon="globe-americas" />
          </Link>

          <ul className="ul-home">
            {menuData.map((categoria) => (
              <Categorias
                key={categoria.id}
                categoryData={categoria}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            ))}
          </ul>
        </div>
        <div className="close-user">
          <CloseSesion />
        </div>
      </div>

      <div className="home-container">
        <div className="home-header">
          <div className="title">Notas</div>
        </div>
        <div className="home-content">
          <Switch location={location}>
            <Route exact path="/admin/notes" component={NotesView} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeCategory: state.appReducer.activeCategory,
    menuData: state.appReducer.menuData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCategory: (activeCategoryValue) =>
      dispatch(AppActions.setActiveCategory(activeCategoryValue)),
    setActiveItem: (activeItem) =>
      dispatch(AppActions.setActiveItem(activeItem)),
    setActiveSesion: (activeSesion) =>
      dispatch(AppActions.setActiveSesion(activeSesion)),
  };
};
const HomeWithRouter = withRouter(Home);
export default connect(mapStateToProps, mapDispatchToProps)(HomeWithRouter);
