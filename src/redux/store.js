import { createStore } from "redux";
import { reducer as loginReducer } from "./reducers/loginReducer";
import { reducer as appReducer } from "./reducers/appReducer";
import { combineReducers } from "redux";

export const reducers = combineReducers({
  loginReducer,
  appReducer,
});

export const store = createStore(reducers);
