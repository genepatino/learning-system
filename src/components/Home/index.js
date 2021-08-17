import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, Switch, Link } from "react-router-dom";
import AppActions from "../../redux/reducers/appReducer";
import Categorias from "../Home/module-components/Categorias/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloseSesion from "../Home/module-components/CloseSesion/index";
import NotesView from "../NotesView/index";
import Users from "../Users/index";
import Directions from "../Directions/index";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import _ from "lodash";
import "../utility/components-utility/FontAwesomeIcon/index";
import "./home.scss";

const Home = ({
  location,
  activeCategory,
  menuData,
  activeItem,
  setActiveCategory,
  setActiveItem,
  setActiveSesion,
}) => {
  const [t] = useTranslation("global");

  const getActiveTitleItem = () => {
    let title;

    menuData.forEach((menuObject) => {
      const item = _.find(menuObject.items, ["id", activeItem]);

      if (item) {
        title = item.name;
      }
    });
    return t(title);
  };

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
        {activeItem !== null && (
          <div
            className={classNames("home-header", {
              titleHeader: activeItem !== null,
            })}
          >
            {getActiveTitleItem()}
          </div>
        )}

        <div className="home-content">
          <Switch location={location}>
            <Route exact path="/admin/notes" component={NotesView} />
            <Route exact path="/admin/users" component={Users} />
            <Route exact path="/admin/directions" component={Directions} />
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
    activeItem: state.appReducer.activeItem,
    activeTitleItem: state.appReducer.activeTitleItem,
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
    setActiveTitleItem: (activeTitleItem) =>
      dispatch(AppActions.setActiveTitleItem(activeTitleItem)),
  };
};
const HomeWithRouter = withRouter(Home);
export default connect(mapStateToProps, mapDispatchToProps)(HomeWithRouter);
