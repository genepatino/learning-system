import React from "react";
import { Link } from "react-router-dom";
import "./menuItem.scss";

const MenuItem = ({ name }) => {
  return (
    <div className="menu-item">
      <li className="menu-list">
        <Link className="ancla" to="#">
          {name}
        </Link>
      </li>
    </div>
  );
};

export default MenuItem;
