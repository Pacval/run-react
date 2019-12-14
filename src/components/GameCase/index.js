import React from "react";

import style from "./gamecase.module.css";
import { OBSTACLE, ENEMY, PLAYER, EXIT, EMPTY } from "../../constants/gameCaseTypes";

export default ({ caseType, torch, selected, onClick }) => {

  const getImgSrc = () => {
    switch (caseType) {
      case OBSTACLE:
        return "./img/obstacle.png";
      case ENEMY:
        return "./img/enemy.png";
      case PLAYER:
        return "./img/player.png";
      case EXIT:
        return "./img/exit.png";
      case EMPTY:
        return "./img/empty.png";
      default:
        return "./img/empty.png";
    }
  }

  return (
    <div
      className={[
        style.caseMainDiv,
        selected ? style.selected : ""
      ].join(" ")}
      onClick={onClick}
    >
      <img
        className={style.image}
        src={require(`${getImgSrc()}`)}
        alt=""
      />
    </div>
  );
};
