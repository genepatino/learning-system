import React from "react";
import Checkbox from "rc-checkbox";
import { connect } from "react-redux";
import NoteActions from "../../../../redux/reducers/noteReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "rc-checkbox/assets/index.css";
import "./unfoldedNote.scss";

const UnfoldedNote = ({ note, setModalOpen, setNoteActive, deletedNote }) => {
  const handleOpenModal = () => {
    setNoteActive(note);
    setModalOpen(true);
  };

  const handleDeleteNote = (id) => {
    deletedNote(id);
  };

  return (
    <div className="all-note">
      <div className="note-title-remove">
        <p className="title">{note.title}</p>
        <FontAwesomeIcon
          className="remove-note"
          icon="times"
          onClick={() => handleDeleteNote(note.id)}
        ></FontAwesomeIcon>
      </div>
      <div className="annotations-checked" onClick={() => handleOpenModal()}>
        <div className="checked-false">
          {Object.keys(note.annotations).map((key, index) => {
            const annotation = note.annotations[key];
            if (!annotation.completed) {
              return (
                <div
                  key={`annotations-${index}`}
                  className="annotations"
                  lang="es"
                >
                  <div className="checkbox-annotation">
                    <Checkbox
                      className="checkbox"
                      disabled
                      checked={annotation.completed}
                    />
                    <span lang="es">{annotation.description}</span>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="checked-true">
          {Object.keys(note.annotations).map((key, index) => {
            const annotation = note.annotations[key];
            if (annotation.completed) {
              return (
                <div
                  key={`annotations-${index}`}
                  className="annotations"
                  lang="es"
                >
                  <div className="checkbox-annotation">
                    <Checkbox
                      className="checkbox"
                      disabled
                      checked={annotation.completed}
                    />
                    <span lang="es">{annotation.description}</span>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    noteActive: state.noteReducer.noteActive,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModalOpen: (modalOpenValue) =>
      dispatch(NoteActions.setModalOpen(modalOpenValue)),
    setNoteActive: (noteActiveValue) =>
      dispatch(NoteActions.setNoteActive(noteActiveValue)),
    appendNoteData: (note) => dispatch(NoteActions.appendNoteData(note)),
    deletedNote: (id) => dispatch(NoteActions.deletedNote(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnfoldedNote);
