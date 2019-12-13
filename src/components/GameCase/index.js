import React from "react";

import style from "./gamecase.module.css";

export default ({ row, col, map, onClick }) => {

  const getImgSrc = () => {
    if (map.obstacles.some(item => item.y === row && item.x === col)) {
      return "./img/obstacle.png";
    } else if (map.enemies.some(item => item.y === row && item.x === col)) {
      return "./img/enemy.png";
    } else if (map.player.y === row && map.player.x === col) {
      return "./img/player.png";
    } else if (map.exit.y === row && map.exit.x === col) {
      return "./img/exit.png";
    } else {
      return "./img/empty.png";
    }
  }
  const torch = map.torches.some(item => item.y === row && item.x === col);
  const isSelected = !!map.selectedCase ? map.selectedCase.y === row && map.selectedCase.x === col : false;

  return (
    <div
      className={[
        style.caseMainDiv,
        isSelected ? style.selected : ""
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
