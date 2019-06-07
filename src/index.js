import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./bootstrap.css";
import "./App.css";
import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";
import { configureStore } from "./app/store/configureStore";
import history from "./app/common/util/history";

const store = configureStore();

const rootEl = document.getElementById("root");

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept("./app/layout/App", () => {
    setTimeout(render);
  });
}

store.firebaseAuthIsReady.then(() => {
  render();
  serviceWorker.unregister();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
