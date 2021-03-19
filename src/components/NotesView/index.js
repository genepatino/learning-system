import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import NoteActions from "../../redux/reducers/noteReducer";
import AppActions from "../../redux/reducers/appReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import Notes from "../NotesView/module-components/Notes/index";
import "../utility/components-utility/FontAwesomeIcon/index";
import "./notesView.scss";

const NotesView = ({ notesData, appendNoteData, setActiveItem }) => {
  const [t] = useTranslation("global");
  const [noteTitle, setNoteTitle] = useState("");

  const handleInput = (event) => {
    if (event.charCode === 13 && noteTitle !== "") {
      const noteId =
        Object.entries(notesData).length === 0
          ? 0
          : Object.keys(notesData)[Object.keys(notesData).length - 1];

      const note = {
        id: Number(noteId) + 1,
        title: noteTitle,
        annotations: {},
      };

      appendNoteData(note);
      setNoteTitle("");
    }
  };

  useEffect(() => {
    setActiveItem(0);
  }, [setActiveItem]);

  return (
    <div className="notes-container">
      <div className="add-note-container">
        <input
          className="add-notes-input"
          placeholder={t("labels.add-note")}
          type="text"
          name="note"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          onKeyPress={handleInput}
        ></input>
        <FontAwesomeIcon className="icon-notes" icon="edit" />
      </div>
      <Notes />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notesData: state.noteReducer.notesData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    appendNoteData: (notesDataValue) =>
      dispatch(NoteActions.appendNoteData(notesDataValue)),
    setActiveItem: (activeItem) =>
      dispatch(AppActions.setActiveItem(activeItem)),
  };
};

const NotesViewWithRouter = withRouter(NotesView);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesViewWithRouter);
