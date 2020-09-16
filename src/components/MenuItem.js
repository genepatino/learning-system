import React from "react";
import { Link } from "react-router-dom";
import "../styles/menuItem.css";

const MenuItem = ({ name }) => {
  return (
    <div className="menu_item">
      <li className="menu_list">
        <Link className="ancla" to="#">
          {name}
        </Link>
      </li>
    </div>
  );
};

export default MenuItem;
