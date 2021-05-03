import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import global_es from "./components/utility/locales/es/global.json";
import global_en from "./components/utility/locales/en/global.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
});

const AppContainer = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <AppContainer />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
