import React from "react";
import MenuItem from "../MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../FontAwesomeIcon";
import classNames from "classnames";
import "./categorias.scss";

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
    <div className={classNames("home-select", { active: visible })}>
      <li className="categorias-list" onClick={handleClick}>
        <FontAwesomeIcon className="icon-home" icon={categoryData.icon} />
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
