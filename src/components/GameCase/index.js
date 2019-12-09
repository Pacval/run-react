import React from "react";

import style from "./gamecase.module.css";
import { PLAYER, OBSTACLE, ENEMY, EXIT } from "../../constants/gameCaseTypes";

export default ({ type, torch }) => {
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
