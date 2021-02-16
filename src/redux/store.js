import { createStore } from "redux";
import { reducer as loginReducer } from "./reducers/loginReducer";
import { reducer as appReducer } from "./reducers/appReducer";
import { reducer as noteReducer } from "./reducers/noteReducer";

import { combineReducers } from "redux";

export const reducers = combineReducers({
  loginReducer,
  appReducer,
  noteReducer,
});

export const store = createStore(reducers);
