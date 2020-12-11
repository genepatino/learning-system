import React, { useState } from "react";
import Popup from "reactjs-popup";
import NoteActions from "../../redux/reducers/noteReducer";
import { connect } from "react-redux";
import Checkbox from "rc-checkbox";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "rc-checkbox/assets/index.css";
import "./modal.scss";

const Modal = ({
  modalOpen,
  noteActive,
  setModalOpen,
  setNoteActive,
  appendNoteData,
  setCompletedAnnotation,
  deletedAnnotation,
}) => {
  const [annotation, setAnnotation] = useState("");

  const handleCloseModal = () => {
    appendNoteData(noteActive);
    setModalOpen(false);
    setNoteActive(null);
  };

  const handleCompletedTaskChange = (checked, annotationId) => {
    setCompletedAnnotation(annotationId, checked);
  };

  const handleDeleteAnnotation = (annotationId) => {
    deletedAnnotation(annotationId);
  };

  const handleAddAnnotation = (e) => {
    if (e.charCode === 13 && annotation !== "") {
      const annotationsId =
        Object.entries(noteActive.annotations).length === 0
          ? 0
          : Object.keys(noteActive.annotations)[
              Object.keys(noteActive.annotations).length - 1
            ];

      const newAnnotation = {
        annotationId: Number(annotationsId) + 1,
        completed: false,
        description: annotation,
      };

      const newNoteActive = {
        ...noteActive,
        annotations: {
          ...noteActive.annotations,
          [newAnnotation.annotationId]: newAnnotation,
        },
      };

      setNoteActive(newNoteActive);
      setAnnotation("");
    }
  };

  return (
    <div>
      <Popup modal open={modalOpen} onClose={handleCloseModal}>
        {noteActive && (
          <div className="modal-note">
            <div className="modal-title">
              <p className="title">{noteActive.title}</p>
            </div>

            <div className="modal-annotations">
              <div className="checked-false">
                {Object.keys(noteActive.annotations).map((key, index) => {
                  const annotation = noteActive.annotations[key];
                  if (!annotation.completed) {
                    return (
                      <div
                        key={`annotation-item-${index}`}
                        className="annotation-item"
                      >
                        <div className="checkbox-annotation">
                          <Checkbox
                            id={annotation.annotationId}
                            checked={annotation.completed}
                            className="checkbox"
                            onChange={(e) =>
                              handleCompletedTaskChange(
                                e.target.checked,
                                annotation.annotationId
                              )
                            }
                          />

                          <label
                            htmlFor={annotation.annotationId}
                            lang="es"
                            className="task"
                          >
                            {annotation.description}
                          </label>
                        </div>
                        <div className="icon-modal">
                          <FontAwesomeIcon
                            onClick={() =>
                              handleDeleteAnnotation(annotation.annotationId)
                            }
                            className="icon-remove"
                            icon="times"
                          ></FontAwesomeIcon>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="input-checkbox-modal">
                <FontAwesomeIcon
                  className="icon-add-annotation"
                  icon="plus"
                ></FontAwesomeIcon>
                <input
                  className="annotations-input"
                  type="text"
                  name="add-annotation"
                  placeholder="Elemento de lista"
                  value={annotation}
                  onChange={(e) => setAnnotation(e.target.value)}
                  onKeyPress={handleAddAnnotation}
                ></input>
              </div>
              <div className="checked-true">
                {Object.keys(noteActive.annotations).map((key, index) => {
                  const annotation = noteActive.annotations[key];
                  if (annotation.completed) {
                    return (
                      <div
                        key={`annotation-item-${index}`}
                        className="annotation-item"
                      >
                        <div className="checkbox-annotation">
                          <Checkbox
                            id={annotation.annotationId}
                            checked={annotation.completed}
                            className="checkbox"
                            onChange={(e) =>
                              handleCompletedTaskChange(
                                e.target.checked,
                                annotation.annotationId
                              )
                            }
                          />

                          <label
                            htmlFor={annotation.annotationId}
                            lang="es"
                            className={classNames("task", {
                              completed: annotation.completed,
                            })}
                          >
                            {annotation.description}
                          </label>
                        </div>
                        <div className="icon-modal">
                          <FontAwesomeIcon
                            onClick={() =>
                              handleDeleteAnnotation(annotation.annotationId)
                            }
                            className={classNames("icon-remove", {
                              "remove-checked-true": annotation.completed,
                            })}
                            icon="times"
                          ></FontAwesomeIcon>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modalOpen: state.noteReducer.modalOpen,
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
    setCompletedAnnotation: (annotationId, checked) =>
      dispatch(NoteActions.setCompletedAnnotation(annotationId, checked)),
    deletedAnnotation: (annotationId) =>
      dispatch(NoteActions.deletedAnnotation(annotationId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
