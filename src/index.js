import React from "react";
import ReactDOM from "react-dom";
import { Router, Redirect } from "@reach/router";

import "./styles/main.css";
import * as serviceWorker from "./utils/serviceWorker";

import Game from "./pages/game";
import SelectLevel from "./pages/select-level";

const App = () => (
  <Router>
    <SelectLevel path="/levels" />
    <Game path="/game" />
    <Redirection default />
  </Router>
);

const Redirection = () => <Redirect to="/levels" noThrow />;

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
