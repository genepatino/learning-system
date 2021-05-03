import { createStore, combineReducers } from "redux";
import { reducer as loginReducer } from "./reducers/loginReducer";
import { reducer as appReducer } from "./reducers/appReducer";
import { reducer as noteReducer } from "./reducers/noteReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ImmutablePersistenceTransform from "./reducers/ImmutablePersistenceTransform";

const reducers = combineReducers({
  loginReducer,
  appReducer,
  noteReducer,
});

const persistConfig = {
  key: "root",
  storage,
  transforms: [ImmutablePersistenceTransform],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
