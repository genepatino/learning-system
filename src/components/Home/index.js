import React from "react";
import { connect } from "react-redux";
import AppActions from "../../redux/reducers/appReducer";
import Categorias from "../Categorias/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloseSesion from "../CloseSesion/index";
import "../FontAwesomeIcon";
import "./home.scss";

const Home = ({ activeCategory, setActiveCategory }) => {
  const menuData = [
    {
      id: 0,
      icon: "cubes",
      span: "Recursos",
      items: ["Vehículos", "Personas", "En Servicio", "Transportadoras"],
    },
    {
      id: 1,
      icon: "dolly",
      span: "Logística",
      items: ["item 1", "item 2", "item 3"],
    },
    {
      id: 2,
      icon: "hand-holding-usd",
      span: "Finanzas",
      items: ["item 1", "item 2", "item 3"],
    },
    {
      id: 3,
      icon: "tools",
      span: "Configuración",
      items: ["item 1", "item 2", "item 3"],
    },
    {
      id: 4,
      icon: "edit",
      span: "Auditoría",
      items: ["item 1", "item 2", "item 3"],
    },
  ];

  return (
    <div className="container-homeTwo">
      <div className="home-menu">
        <FontAwesomeIcon className="logo" icon="globe-americas" />
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
        <div className="close-user">
          <CloseSesion />
        </div>
      </div>

      <div className="home-Titulo">
        <h3>Vehículos</h3>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeCategory: state.appReducer.activeCategory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCategory: (activeCategoryValue) =>
      dispatch(AppActions.setActiveCategory(activeCategoryValue)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
