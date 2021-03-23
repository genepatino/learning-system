import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import AppActions from "../../redux/reducers/appReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apiUrl from "../utility/constantes/apiUrl";
import { useTranslation } from "react-i18next";
import Button from "../utility/components-utility/Button/index";
import CreateUsers from "../Users/module-components/CreateUsers/index";
import EditUsers from "../Users/module-components/EditUsers/index";
import Loader from "../utility/components-utility/Loader/index";
import Popup from "reactjs-popup";

import "../utility/components-utility/FontAwesomeIcon";
import "./users.scss";

const Users = ({
  users,
  setUsers,
  setOpenModal,
  setLoader,
  loader,
  setEditUser,
  editUser,
  openModal,
  setActiveItem,
}) => {
  const [t] = useTranslation("global");

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleClickCreateUser = () => {
    setEditUser({});
    setOpenModal(true);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setOpenModal(true);
  };

  const getInformation = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/users`);
      const data = await response.json();

      setUsers(data.data);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  }, [setUsers, setLoader]);

  useEffect(() => {
    getInformation();
    setActiveItem(4);
  }, [getInformation, setActiveItem]);

  return (
    <div className="global-user">
      {loader ? (
        <Loader />
      ) : (
        <div className="container-information">
          <div className="container-button">
            <Button
              className="new-user"
              onClick={handleClickCreateUser}
              button={t("labels.create-user")}
              icon="user-plus"
            />
          </div>
          <div className="container-table">
            <table className="user-list">
              <tbody className="tbody">
                {users.map((user) => {
                  const name = user.name;
                  const nameString = name.split(" ", 2);
                  const firstName = nameString[0][0];
                  let lastName = "";

                  if (nameString[1]) {
                    lastName = nameString[1][0];
                  }

                  const wordName = (firstName + lastName).toUpperCase();
                  return (
                    <tr key={user.id}>
                      <td className="user-logo">{wordName}</td>
                      <td className="user-name">{user.name}</td>
                      <td className="user-email">{user.email}</td>
                      <td className="user-email">{user.gender}</td>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Popup modal open={openModal} onClose={closeModal}>
        {Object.keys(editUser).length === 0 ? (
          <CreateUsers getInformation={getInformation} />
        ) : (
          <EditUsers getInformation={getInformation} />
        )}
      </Popup>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.appReducer.users,
    loader: state.appReducer.loader,
    openModal: state.appReducer.openModal,
    editUser: state.appReducer.editUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (users) => dispatch(AppActions.setUsers(users)),
    setOpenModal: (openModal) => dispatch(AppActions.setOpenModal(openModal)),
    setLoader: (loader) => dispatch(AppActions.setLoader(loader)),
    setEditUser: (editUser) => dispatch(AppActions.setEditUser(editUser)),
    setActiveItem: (activeItem) =>
      dispatch(AppActions.setActiveItem(activeItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
