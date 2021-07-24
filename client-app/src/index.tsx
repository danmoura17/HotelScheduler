import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./app/layouts/styles.css";
import App from "./app/layouts/App";
import reportWebVitals from "./reportWebVitals";
import "moment/locale/fr-ca";
import "moment/locale/pt-br";
import "moment/locale/es";
import "moment/locale/en-ca";
import { store, StoreContext } from "./app/stores/store";
import { BrowserRouter } from "react-router-dom";
import 'react-calendar/dist/Calendar.css'

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
