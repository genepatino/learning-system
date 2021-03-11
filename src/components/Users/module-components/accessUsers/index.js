import React from "react";
import { connect } from "react-redux";

import "./accessUsers.scss";

const AccessUsers = ({ editUser }) => {
  return (
    <div className="container-access-user">
      <div className="edit-user-container">
        <h2 className="title">Editar Usuarios</h2>
        <div className="edit-user">
          <div className="edit-user-name">
            <p>Name:</p>
            <p>{editUser.name}</p>
          </div>
          <div className="edit-user-email">
            <p>Correo electrónico:</p>
            <p>{editUser.email}</p>
          </div>
          <div className="edit-user-gender">
            <p>Genero:</p>
            <p>{editUser.gender}</p>
          </div>
          <div className="edit-user-status">
            <p>Estado:</p>
            <p>{editUser.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    editUser: state.appReducer.editUser,
  };
};

export default connect(mapStateToProps, null)(AccessUsers);