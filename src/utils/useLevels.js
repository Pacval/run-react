import React, { createContext, useState, useContext, useEffect } from "react";

const levelsProvider = createContext();
const { Provider, Consumer } = levelsProvider;

const initialLevels = [];

export const LevelsProvider = ({ children }) => {
  const [levels, setLevels] = useState(initialLevels);

  useEffect(() => {
    setLevels([
      {
        id: 123,
        number: 1,
        completed: false,
        dimensions: { row: 4, col: 4 },
        player: { y: 0, x: 0 },
        exit: { y: 0, x: 3 },
        enemies: [{ y: 3, x: 0 }],
        obstacles: [
          { y: 2, x: 0 },
          { y: 2, x: 1 },
          { y: 2, x: 2 }
        ],
        torches: [{ y: 0, x: 1 }]
      },
      {
        id: 1000,
        number: 2,
        completed: false,
        dimensions: { row: 4, col: 4 },
        player: { y: 0, x: 3 },
        exit: { y: 0, x: 0 },
        enemies: [{ y: 3, x: 0 }],
        obstacles: [
          { y: 2, x: 0 },
          { y: 2, x: 1 },
          { y: 2, x: 2 }
        ],
        torches: [{ y: 0, x: 1 }]
      }
    ]);
  }, []);

  return <Provider value={{ levels, setLevels }}>{children}</Provider>;
};

export const LevelsConsumer = Consumer;

export default () => useContext(levelsProvider);
