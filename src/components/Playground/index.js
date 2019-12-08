import React from "react";

import style from "./playground.module.css";

import GameCase from "../GameCase";

export default ({ map }) => {
  return (
    <div className={style.playgroundMainDiv}>
      {map.sort((a, b) => a.rowIndex - b.rowIndex).map(row => {
        return (
          <div key={row.rowIndex} className={style.row}>
            {row.data.sort((a, b) => a.colIndex - b.colIndex).map(gameCase => (
              <GameCase
                key={gameCase.colIndex}
                type={gameCase.type}
                torch={gameCase.torch}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};
