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

export const CommunityLevelsProvider = ({ children }) => {
  const [status, setStatus] = useState(NOT_REQUESTED);
  const [levels, setLevels] = useState(initialLevels);
  const [dummy, setDummy] = useState({});

  useEffect(() => {
    (async () => {
      setStatus(LOADING);
      api({
        method: GET,
        url: "http://localhost:8000/community-level",
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
  }, [dummy]);

  const reload = () => {
    setDummy({});
  };

  return (
    <Provider value={{ levels, setLevels, status, reload }}>
      {children}
    </Provider>
  );
};

export const CommunityLevelsConsumer = Consumer;

export default () => useContext(levelsProvider);
