import React from "react";

import style from "./playground.module.css";

import GameCase from "../GameCase";
import { PLAYER, EMPTY, ENEMY, EXIT } from "../../constants/gameCaseTypes";

export default () => {
  const map = [
    {
      index: 0,
      data: [
        { y: 0, x: 0, type: PLAYER, torch: false },
        { y: 0, x: 1, type: EMPTY, torch: false },
        { y: 0, x: 2, type: EXIT, torch: false }
      ]
    },
    {
      index: 1,
      data: [
        { y: 1, x: 0, type: EMPTY, torch: false },
        { y: 1, x: 1, type: EMPTY, torch: false },
        { y: 1, x: 2, type: EMPTY, torch: false }
      ]
    },
    {
      index: 2,
      data: [
        { y: 2, x: 0, type: ENEMY, torch: false },
        { y: 2, x: 1, type: EMPTY, torch: false },
        { y: 2, x: 2, type: EMPTY, torch: false }
      ]
    }
  ];

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
