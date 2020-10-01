import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setEmail: ["email"],
  setPassword: ["password"],
  setError: ["error"],
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email: "",
  password: "",
  error: "",
});

/* ------------- Reducers ------------- */

export const setEmail = (state, { email }) => state.merge({ email });

export const setPassword = (state, { password }) => state.merge({ password });

export const setError = (state, { error }) => state.merge({ error });
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_EMAIL]: setEmail,
  [Types.SET_PASSWORD]: setPassword,
  [Types.SET_ERROR]: setError,
});
