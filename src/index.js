import React from "react";
import ReactDOM from "react-dom";
import { Router, Redirect } from "@reach/router";

import "./styles/main.css";
import * as serviceWorker from "./utils/serviceWorker";

import Menu from "./pages/menu";
import SelectLevel from "./pages/select-level";
import Game from "./pages/game";
import CreateLevel from "./pages/create-level";
import { LevelsProvider } from "./utils/useLevels";

const App = () => (
  <LevelsProvider>
    <Router>
      <Menu path="/" />
      <SelectLevel path="/levels" />
      <Game path="/game" />
      <CreateLevel path="/create-level" />
      <Redirection default />
    </Router>
  </LevelsProvider>
);

const Redirection = () => <Redirect to="/" noThrow />;

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
