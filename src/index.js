import React from "react";
import ReactDOM from "react-dom";
import { Router, Redirect } from "@reach/router";
import Alert from "react-s-alert";

import "./styles/main.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/scale.css";

import * as serviceWorker from "./utils/serviceWorker";
import { LevelsProvider } from "./utils/useLevels";

import Menu from "./pages/menu";
import SelectLevel from "./pages/select-level";
import Game from "./pages/game";
import CreateLevel from "./pages/create-level";
import TestGame from "./pages/test-game";

const App = () => (
  <LevelsProvider>
    <Router>
      <Menu path="/" />
      <SelectLevel path="/levels" />
      <Game path="/game" />
      <CreateLevel path="/create-level" />
      <TestGame path="/test-game" />
      <Redirection default />
    </Router>
    <Alert stack={{ limit: 3 }} effect="scale" />
  </LevelsProvider>
);

const Redirection = () => <Redirect to="/" noThrow />;

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
