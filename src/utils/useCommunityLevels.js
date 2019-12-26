import React, { createContext, useState, useContext, useEffect } from "react";
import {
  NOT_REQUESTED,
  LOADING,
  SUCCESS,
  FAILURE
} from "../constants/apiStates";

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
      const response = await fetch("http://localhost:8000/community-level")
        .then(r => {
          if (r.status === 200) {
            return r.json().then(d => ({ ...d, ok: true }));
          }
          return { ok: false };
        })
        .catch(() => ({ ok: false }));

      if (response.ok) {
        setStatus(SUCCESS);
        setLevels(response.payload);
      } else {
        setStatus(FAILURE);
      }
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
