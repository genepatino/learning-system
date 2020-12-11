import React from "react";
import { Link } from "react-router-dom";

import classNames from "classnames";
import "./menuItem.scss";

const MenuItem = ({ name, itemsData, activeItem, setActiveItem }) => {
  const selectedItem = itemsData.id === activeItem;

  const handleClick = () => {
    if (selectedItem) {
      setActiveItem(null);
    } else {
      setActiveItem(itemsData.id);
    }
  };

  return (
    <div className="menu-item">
      <li className="menu-list" onClick={handleClick}>
        <Link
          className={classNames("ancla", {
            visible: selectedItem,
          })}
          to={itemsData.rute}
        >
          {name}
        </Link>
      </li>
    </div>
  );
};

export default MenuItem;
