import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import AppActions from "../../redux/reducers/appReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apiUrl from "../utility/constantes/apiUrl";
import { useTranslation } from "react-i18next";
import Button from "../utility/components-utility/Button/index";
import CreateUsers from "../Users/module-components/CreateUsers/";
import Loader from "../utility/components-utility/Loader/index";

import "../utility/components-utility/FontAwesomeIcon";
import "./users.scss";

const Users = ({
  users,
  setUsers,
  setActiveItem,
  setActiveCategory,
  setModal,
  setLoader,
  loader,
  setEditUser,
  history,
}) => {
  const [t] = useTranslation("global");

  const handleClick = () => {
    setModal(true);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setActiveCategory(null);
    setActiveItem(null);
    history.push(`/admin/accessUsers/${user.id}`);
  };

  const getInformation = async () => {
    try {
      const response = await fetch(`${apiUrl}/users`);
      const data = await response.json();

      setUsers(data.data);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInformation();
    setActiveItem(4);
  });

  return (
    <div className="global-user">
      {loader ? (
        <Loader />
      ) : (
        <div className="container-information">
          <div className="container-button">
            <Button
              className="new-user"
              onClick={handleClick}
              button={t("labels.create-user")}
              icon="user-plus"
            />
          </div>
          <div className="container-table">
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
                      <td className="user-icon">
                        <div
                          className="rute-edit-users"
                          onClick={() => handleEditUser(user)}
                        >
                          <FontAwesomeIcon className="icon" icon="user-edit" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      )}
      <CreateUsers />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.appReducer.users,
    loader: state.appReducer.loader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (users) => dispatch(AppActions.setUsers(users)),
    setActiveItem: (activeItem) =>
      dispatch(AppActions.setActiveItem(activeItem)),
    setActiveCategory: (activeCategory) =>
      dispatch(AppActions.setActiveCategory(activeCategory)),
    setModal: (openModal) => dispatch(AppActions.setModal(openModal)),
    setLoader: (loader) => dispatch(AppActions.setLoader(loader)),
    setEditUser: (editUser) => dispatch(AppActions.setEditUser(editUser)),
  };
};

const UsersWithRouter = withRouter(Users);
export default connect(mapStateToProps, mapDispatchToProps)(UsersWithRouter);
