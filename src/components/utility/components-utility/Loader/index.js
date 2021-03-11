import React from "react";
import { connect } from "react-redux";

import "./loader.scss";

const Loader = ({ loader }) => {
  return <div>{loader === true && <div className="loader-page"></div>}</div>;
};

const mapStateToProps = (state) => {
  return {
    loader: state.appReducer.loader,
  };
};

export default connect(mapStateToProps, null)(Loader);
