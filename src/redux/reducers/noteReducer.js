import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  appendNoteData: ["note"],
  setModalOpen: ["modalOpen"],
  setNoteActive: ["noteActive"],
  setCompletedAnnotation: ["annotationId", "checked"],
  deletedAnnotation: ["annotationId"],
  deletedNote: ["id"],
});

export const NoteTypes = Types;
export default Creators;
/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  notesData: {},
  modalOpen: false,
  noteActive: null,
});

/* ------------- Reducers ------------- */

export const appendNoteData = (state, { note }) => {
  let notesData = {
    ...state.notesData,
  };
  notesData[note.id] = note;
  return state.merge({ notesData });
};

export const setModalOpen = (state, { modalOpen }) =>
  state.merge({ modalOpen });

export const setNoteActive = (state, { noteActive }) =>
  state.merge({ noteActive });

export const setCompletedAnnotation = (state, { annotationId, checked }) => {
  const newNoteActive = {
    ...state.noteActive,
    annotations: {
      ...state.noteActive.annotations,
      [annotationId]: {
        ...state.noteActive.annotations[annotationId],
        completed: checked,
      },
    },
  };

  return state.merge({ noteActive: newNoteActive });
};

export const deletedAnnotation = (state, { annotationId }) => {
  let newNoteActive = {
    ...state.noteActive,
    annotations: {
      ...state.noteActive.annotations,
    },
  };
  delete newNoteActive.annotations[annotationId];

  return state.merge({ noteActive: newNoteActive });
};

export const deletedNote = (state, { id }) => {
  let newNoteActive = {
    ...state.notesData,
  };
  delete newNoteActive[id];
  return state.merge({ notesData: newNoteActive });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APPEND_NOTE_DATA]: appendNoteData,
  [Types.SET_MODAL_OPEN]: setModalOpen,
  [Types.SET_NOTE_ACTIVE]: setNoteActive,
  [Types.SET_COMPLETED_ANNOTATION]: setCompletedAnnotation,
  [Types.DELETED_ANNOTATION]: deletedAnnotation,
  [Types.DELETED_NOTE]: deletedNote,
});
