import React, { createContext, useState, useContext } from "react";
import Axios from "axios";
import Alert from "react-s-alert";

const levelsProvider = createContext();
const { Provider, Consumer } = levelsProvider;

export const StoryLevelsProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  const authenticate = ({ username, password }) => {
    Axios.get("http://localhost:8000/authenticate", {
      username: username,
      password: password
    })
      .then(res => {
        setUsername(res);
      })
      .catch(err => {
        Alert.error("Erreur lors de l'authentification : " + err, {
          timeout: 2000
        });
      });
  };

  return <Provider value={{ username, authenticate }}>{children}</Provider>;
};

export const StoryLevelsConsumer = Consumer;

export default () => useContext(levelsProvider);
