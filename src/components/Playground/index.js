import React from "react";
import { Link } from "@reach/router";

import style from "./playground.module.css";

import GameCase from "../GameCase";

export default ({ map }) => {
  return (
    <div className={style.gameDiv}>
      {map.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className={style.row}>
            {row.map((gameCase, colIndex) => (
              <GameCase
                key={colIndex}
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
