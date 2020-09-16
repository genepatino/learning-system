import React, { useState } from "react";
import Categorias from "../components/Categorias";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/FontAwesomeIcon";
import "../styles/home.css";
import CloseSesion from "./CloseSesion";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState(null);

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
    <div className="container_homeTwo">
      <div className="home_menu">
        <FontAwesomeIcon className="logo" icon="globe-americas" />
        <ul className="ul_home">
          {menuData.map((categoria) => (
            <Categorias
              key={categoria.id}
              categoryData={categoria}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </ul>
        <div className="close_user">
          <CloseSesion />
        </div>
      </div>

      <div className="home_Titulo">
        <h3>Vehículos</h3>
      </div>
    </div>
  );
};

export default Home;
