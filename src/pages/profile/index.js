import React, { useState } from "react";
import useUser from "../../utils/useUser";

export default () => {
  const { user, authenticate } = useUser();

  const [authPseudo, setAuthPseudo] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  const handleClickAuthent = () => {
    authenticate({
      username: authPseudo,
      password: authPassword
    });
  };

  return (
    <>
      {!user ? (
        <>
          <label>
            Pseudo :
            <input
              value={authPseudo}
              onChange={event => setAuthPseudo(event.target.value)}
            ></input>
          </label>
          <label>
            Mot de passe :
            <input
              type="password"
              value={authPassword}
              onChange={event => setAuthPassword(event.target.value)}
            ></input>
          </label>
          <button
            onClick={handleClickAuthent}
            disabled={authPseudo === "" || authPassword === ""}
          >
            Connexion
          </button>
        </>
      ) : (
        <>{user.pseudo}</>
      )}
    </>
  );
};
