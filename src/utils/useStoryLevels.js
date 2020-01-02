import React, { createContext, useState, useContext, useEffect } from "react";

import {
  NOT_REQUESTED,
  LOADING,
  SUCCESS,
  FAILURE,
  GET
} from "../constants/api";

import api from "./api";

const levelsProvider = createContext();
const { Provider, Consumer } = levelsProvider;

const initialLevels = [];

export const StoryLevelsProvider = ({ children }) => {
  const [status, setStatus] = useState(NOT_REQUESTED);
  const [levels, setLevels] = useState(initialLevels);

  useEffect(() => {
    (async () => {
      setStatus(LOADING);
      api({
        method: GET,
        url: "http://localhost:8000/story-level",
        params: {}
      }).then(response => {
        if (response.ok) {
          setStatus(SUCCESS);
          setLevels(response.payload);
        } else {
          setStatus(FAILURE);
        }
      });
    })();
    setLevels([]);
  }, []);

  return <Provider value={{ levels, setLevels, status }}>{children}</Provider>;
};

export const StoryLevelsConsumer = Consumer;

export default () => useContext(levelsProvider);
