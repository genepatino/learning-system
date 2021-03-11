import React from "react";
import { connect } from "react-redux";
import UnfoldedNote from "../UnfoldedNote/index";
import Modal from "../Modal/index";

import "./notes.scss";

const Notes = ({ notesData }) => {
  return (
    <div className="note-container">
      {Object.keys(notesData).map((key, index) => {
        return (
          <UnfoldedNote key={`unfolded-note-${index}`} note={notesData[key]} />
        );
      })}
      <Modal />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    notesData: state.noteReducer.notesData,
  };
};

export default connect(mapStateToProps, null)(Notes);
