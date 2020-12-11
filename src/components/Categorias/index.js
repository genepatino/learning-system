import React from "react";
import MenuItem from "../MenuItem";
import { connect } from "react-redux";
import AppActions from "../../redux/reducers/appReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../FontAwesomeIcon";
import classNames from "classnames";
import "./categorias.scss";

const Categorias = ({
  categoryData,
  activeCategory,
  activeItem,
  setActiveCategory,
  setActiveItem,
}) => {
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
      <li className="categorias-list">
        <div className="container-icon-list" onClick={handleClick}>
          <FontAwesomeIcon className="icon-home" icon={categoryData.icon} />
          <span className="title">{categoryData.span}</span>
        </div>

        <ul
          className={classNames("ul-container", {
            visible: visible,
          })}
        >
          {categoryData.items.map((item, index) => {
            return (
              <MenuItem
                itemsData={item}
                name={item.name}
                key={`${index}-${item}`}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            );
          })}
        </ul>
      </li>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeItem: state.appReducer.activeItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveItem: (activeItem) =>
      dispatch(AppActions.setActiveItem(activeItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categorias);
