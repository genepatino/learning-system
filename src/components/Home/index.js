import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, Switch, Link } from "react-router-dom";
import AppActions, { setError } from "../../redux/reducers/appReducer";
import Categorias from "../Categorias/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloseSesion from "../CloseSesion/index";
import NotesView from "../NotesView/index";
import Users from "../Users/index";
import CreateUsers from "../CreateUsers/index";
import AccessUsers from "../accessUsers/index";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import _ from "lodash";
import "../FontAwesomeIcon";
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

    /* for (let menuObject = 0; menuObject < menuData.length - 1; menuObject++) {
      const item = _.find(menuObject.items, ["id", activeItem]);
      if (item) {
        title = item.name;
        break;
      }
    }
    return title; */

    ///////////////////////////////

    /* if (activeItem !== null) {
      return activeTitleItem;
    } */

    ///////////////////////////
    /* let header = "";

    menuData.forEach((element) => {
      element.items.forEach((title) => {
        if (activeItem === title.id) {
          header = title.name;
        }
      });
    });
    return header; */
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

        {activeItem !== null && (
          <div className="home-content">
            <Switch location={location}>
              <Route exact path="/admin/notes" component={NotesView} />
            </Switch>
            <Switch location={location}>
              <Route exact path="/admin/users" component={Users} />
            </Switch>
          </div>
        )}

        <Switch location={location}>
          <Route exact path="/admin/accessUsers/:id" component={AccessUsers} />
        </Switch>

        <Switch location={location}>
          <Route exact path="/admin/createUser/" component={CreateUsers} />
        </Switch>
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
