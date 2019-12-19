import React, { createContext, useState, useContext, useEffect } from "react";
import { NOT_REQUESTED, LOADING, SUCCESS, FAILURE } from "../constants/api";

const levelsProvider = createContext();
const { Provider, Consumer } = levelsProvider;

const initialLevels = [];

export const LevelsProvider = ({ children }) => {
  const [status, setStatus] = useState(NOT_REQUESTED);
  const [levels, setLevels] = useState(initialLevels);

  useEffect(() => {
    (async () => {
      setStatus(LOADING);
      const response = await fetch("http://localhost:8000/levels")
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
  }, []);

  return <Provider value={{ levels, setLevels, status }}>{children}</Provider>;
};

export const LevelsConsumer = Consumer;

export default () => useContext(levelsProvider);
