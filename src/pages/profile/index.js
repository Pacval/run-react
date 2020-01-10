import React, { useState } from "react";
import { Link } from "@reach/router";

import useUser from "../../utils/useUser";

export default () => {
  const { user, authenticate } = useUser();

  const [modeLogin, setModeLogin] = useState(true);

  const [logInUsername, setLogInUsername] = useState("");
  const [logInPassword, setLogInPassword] = useState("");

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleClickLogIn = () => {
    authenticate({
      username: logInUsername,
      password: logInPassword
    });
  };

  const handleClickSignUp = () => {};

  return (
    <>
      <Link to="/">Revenir au menu</Link>
      {!user ? (
        modeLogin ? (
          <>
            {/* log in */}
            <label>
              Username :
              <input
                value={logInUsername}
                onChange={event => setLogInUsername(event.target.value)}
              ></input>
            </label>
            <label>
              Mot de passe :
              <input
                type="password"
                value={logInPassword}
                onChange={event => setLogInPassword(event.target.value)}
              ></input>
            </label>
            <button
              onClick={handleClickLogIn}
              disabled={logInUsername === "" || logInPassword === ""}
            >
              Connexion
            </button>
            Pas de compte ?
            <button onClick={() => setModeLogin(false)}>Créer un compte</button>
          </>
        ) : (
          <>
            {/* sign up */}
            <label>
              Username :
              <input
                value={signUpUsername}
                onChange={event => setSignUpUsername(event.target.value)}
              ></input>
            </label>
            <label>
              Mot de passe :
              <input
                type="password"
                value={signUpPassword}
                onChange={event => setSignUpPassword(event.target.value)}
              ></input>
            </label>
            <button
              onClick={handleClickSignUp}
              disabled={signUpUsername === "" || signUpPassword === ""}
            >
              Créer
            </button>
            Déjà un compte ?
            <button onClick={() => setModeLogin(true)}>Créer un compte</button>
          </>
        )
      ) : (
        <>{user.pseudo}</>
      )}
    </>
  );
};
