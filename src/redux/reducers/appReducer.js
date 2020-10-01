import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setActiveCategory: ["activeCategory"],
  setActiveSesion: ["activeSesion"],
});

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  activeCategory: null,
  activeSesion: false,
});

/* ------------- Reducers ------------- */

export const setActiveCategory = (state, { activeCategory }) =>
  state.merge({ activeCategory });

export const setActiveSesion = (state, { activeSesion }) =>
  state.merge({ activeSesion });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_ACTIVE_CATEGORY]: setActiveCategory,
  [Types.SET_ACTIVE_SESION]: setActiveSesion,
});
