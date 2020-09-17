import React from "react";
import MenuItem from "../components/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FontAwesomeIcon";
import classNames from "classnames";
import "../styles/categorias.scss";

const Categorias = ({ categoryData, activeCategory, setActiveCategory }) => {
  const visible = categoryData.id === activeCategory;

  const handleClick = () => {
    if (visible) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryData.id);
    }
  };

  return (
    <div className={classNames("home_select", { active: visible })}>
      <li className="categorias_list" onClick={handleClick}>
        <FontAwesomeIcon className="icon_home" icon={categoryData.icon} />
        <span className="title">{categoryData.span}</span>
        <ul className={classNames("ul-container", { visible: visible })}>
          {categoryData.items.map((item, index) => {
            return <MenuItem name={item} key={`${index}-${item}`} />;
          })}
        </ul>
      </li>
    </div>
  );
};

export default Categorias;
