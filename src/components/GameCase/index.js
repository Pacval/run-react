import React, { useState, useEffect } from "react";

import style from "./gamecase.module.css";
import { PLAYER, OBSTACLE, ENEMY, EXIT, EMPTY } from "../../constants/gameCaseTypes";

export default ({ row, col, map }) => {

  const [type, setType] = useState(EMPTY);
  const [torch, setTorch] = useState(false);

  useEffect(() => {
    if (map.obstacles.some(item => item.y === row && item.x === col)) {
      setType(OBSTACLE);
    } else if (map.enemies.some(item => item.y === row && item.x === col)) {
      setType(ENEMY);
    } else if (map.player.y === row && map.player.x === col) {
      setType(PLAYER);
    } else if (map.exit.y === row && map.exit.x === col) {
      setType(EXIT);
    } else {
      setType(EMPTY);
    }

    setTorch(map.torches.some(item => item.y === row && item.x === col));
  });

  return (
    <div className={style.caseMainDiv}>
      {(type === OBSTACLE && (
        <img
          className={style.image}
          src={require("./img/obstacle.png")}
          alt=""
        />
      )) ||
        (type === ENEMY && (
          <img
            className={style.image}
            src={require("./img/enemy.png")}
            alt=""
          />
        )) ||
        (type === PLAYER && (
          <img
            className={style.image}
            src={require("./img/player.png")}
            alt=""
          />
        )) ||
        (type === EXIT && (
          <img className={style.image} src={require("./img/exit.png")} alt="" />
        ))}
    </div>
  );
};
