import React, { createContext, useState, useContext } from "react";
import Axios from "axios";
import Alert from "react-s-alert";

const userProvider = createContext();
const { Provider, Consumer } = userProvider;

const noUser = "";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(noUser);

  const authenticate = ({ username, password }) => {
    Axios.post("http://localhost:8000/authenticate", { username, password })
      .then(res => {
        setUser(res);
      })
      .catch(err => {
        Alert.error(
          "Erreur lors de l'authentification : " + err.response.data.message,
          {
            timeout: 2000
          }
        );
      });
  };

  return <Provider value={{ user, authenticate }}>{children}</Provider>;
};

export const StoryLevelsConsumer = Consumer;

export default () => useContext(userProvider);
