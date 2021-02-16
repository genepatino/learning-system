import React, { useEffect } from "react";
import { connect } from "react-redux";
import AppActions from "../../redux/reducers/appReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apiUrl from "../utility/constantes/apiUrl";
import { useTranslation } from "react-i18next";

import "../FontAwesomeIcon";
import "./users.scss";
import { Link } from "react-router-dom";

const Users = ({ users, setUsers, setActiveItem }) => {
  const [t] = useTranslation("global");
  const handleClick = () => {
    setActiveItem(null);
  };

  const handleUserClick = () => {
    setActiveItem(null);
  };

  const getInformation = async () => {
    try {
      const response = await fetch(`${apiUrl}/users`);
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInformation();
  });

  return (
    <div className="global-user">
      <div className="create-user">
        <p>Agg nuevo usuario</p>
        <Link
          className="new-user"
          to={"/admin/createUser"}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon="user-plus" className="icon-create-user" />
        </Link>
      </div>
      <div className="container-information">
        <table className="user-list">
          {users.map((user, index) => {
            const name = user.name;
            const nameString = name.split(" ", 2);
            const firstName = nameString[0][0];
            let lastName = "";

            if (nameString[1]) {
              lastName = nameString[1][0];
            }

            const wordName = (firstName + lastName).toUpperCase();
            return (
              <tbody key={index} className="tbody">
                <tr>
                  <td className="user-logo">{wordName}</td>
                  <td className="user-name">{user.name}</td>
                  <td className="user-email">{user.email}</td>
                  <td className="user-status">{user.status}</td>
                  <td className="user-icon ">
                    <Link
                      className="rute-edit-users"
                      to={`/admin/accessUsers/${user.id}`}
                      onClick={handleUserClick}
                    >
                      <FontAwesomeIcon className="icon" icon="user-edit" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>

      {/* <div className="create-user">
        <Link
          className="new-user"
          to={"/admin/createUser"}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon="user-plus" className="icon-create-user" />
        </Link>
      </div> */}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.appReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (users) => dispatch(AppActions.setUsers(users)),
    setActiveItem: (activeItem) =>
      dispatch(AppActions.setActiveItem(activeItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
