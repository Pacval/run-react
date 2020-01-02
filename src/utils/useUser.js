import React, { createContext, useState, useContext } from "react";
import Alert from "react-s-alert";
import api from "./api";
import { POST } from "../constants/api";

const userProvider = createContext();
const { Provider, Consumer } = userProvider;

const noUser = "";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(noUser);

  const authenticate = ({ username, password }) => {
    api({
      method: POST,
      url: "http://localhost:8000/authenticate",
      params: { username, password }
    }).then(response => {
      if (response.ok) {
        setUser(response.payload);
      } else {
        setUser(noUser);
        Alert.error("Erreur lors de l'authentification : " + response.message, {
          timeout: 2000
        });
      }
    });
  };

  return <Provider value={{ user, authenticate }}>{children}</Provider>;
};

export const StoryLevelsConsumer = Consumer;

export default () => useContext(userProvider);
