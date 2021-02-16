import React, { useEffect } from "react";
import { connect } from "react-redux";
import AppActions from "../../redux/reducers/appReducer";
import apiUrl from "../utility/constantes/apiUrl";
import "./accessUsers.scss";
import { useParams } from "react-router-dom";

const AccessUsers = ({ editUser, setEditUser }) => {
  const { id } = useParams();

  const getInformation = async () => {
    try {
      const response = await fetch(`${apiUrl}/users/${id}`);
      const data = await response.json();
      setEditUser(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInformation();
  });

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

const mapDispatchToProps = (dispatch) => {
  return {
    setEditUser: (editUser) => dispatch(AppActions.setEditUser(editUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccessUsers);
