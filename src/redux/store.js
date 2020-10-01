import { createStore } from "redux";
import { reducer as loginReducer } from "./reducers/loginReducer";
import { combineReducers } from "redux";

export const reducers = combineReducers({
  loginReducer,
});

export const store = createStore(reducers);
