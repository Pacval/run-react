import React from "react";

import style from "./playground.module.css";

import GameCase from "../GameCase";
import { PLAYER, EMPTY, ENEMY, EXIT } from "../../constants/gameCaseTypes";

export default ({ map }) => {
  return (
    <div className={style.playgroundMainDiv}>
      {map.map(row => {
        return (
          <div key={row.index} className={style.row}>
            {row.data.map(gameCase => (
              <GameCase
                key={gameCase.y + "." + gameCase.x}
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
