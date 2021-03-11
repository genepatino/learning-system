import React from "react";
import { connect } from "react-redux";
import AppActions from "../../redux/reducers/appReducer";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./menuItem.scss";

const MenuItem = ({
  name,
  itemsData,
  activeItem,
  setActiveItem,
  setActiveTitleItem,
}) => {
  const selectedItem = itemsData.id === activeItem;
  const handleClick = () => {
    setActiveItem(itemsData.id);
    setActiveTitleItem(itemsData.name);
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

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveTitleItem: (activeTitleItem) =>
      dispatch(AppActions.setActiveTitleItem(activeTitleItem)),
  };
};

export default connect(null, mapDispatchToProps)(MenuItem);
