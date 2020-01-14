import React, { createContext, useState, useContext, useEffect } from "react";
import Alert from "react-s-alert";

import api from "./api";

import { POST, GET } from "../constants/api";
import { STORY, COMMUNITY } from "../constants/levelTypes";

const userProvider = createContext();
const { Provider, Consumer } = userProvider;

const noUser = "";
const emptyArray = [];

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(noUser);
  const [userProgressStory, setUserProgressStory] = useState(emptyArray);

  const [dummy, setDummy] = useState({});

  // authentification de l'utilisateur
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

  // récupération des niveaux complétés par l'utilisateur
  useEffect(() => {
    if (!!user && !!user.id) {
      api({
        method: GET,
        url: "http://localhost:8000/user-progress-story/" + user.id
      }).then(response => {
        if (response.ok) {
          setUserProgressStory(response.payload);
        } else {
          setUserProgressStory(emptyArray);
          Alert.error(
            "Erreur lors de la récupérations des niveaux complétés : " +
              response.message,
            {
              timeout: 2000
            }
          );
        }
      });
    }
  }, [user, dummy]);

  // ajout d'un niveau complété, story ou community
  const addCompletedLevel = ({ levelType, levelId }) => {
    if (levelType === STORY) {
      if (!!userProgressStory.find(level => level.id === levelId)) {
        return;
      }
      api({
        method: POST,
        url: "http://localhost:8000/user-progress-story/",
        params: { userId: user.id, storyLevelId: levelId, score: 0 }
      }).then(response => {
        if (response.ok) {
          // on recharge ses niveaux complétés
          setDummy({});
        } else {
          Alert.error(
            "Erreur lors de la mise à jour des niveaux complétés : " +
              response.message,
            {
              timeout: 2000
            }
          );
        }
      });
    } else if (levelType === COMMUNITY) {
    }
  };

  const reloadUserStoryProgress = () => {
    setDummy({});
  };

  return (
    <Provider
      value={{
        user,
        authenticate,
        userProgressStory,
        addCompletedLevel,
        reloadUserStoryProgress
      }}
    >
      {children}
    </Provider>
  );
};

export const StoryLevelsConsumer = Consumer;

export default () => useContext(userProvider);
