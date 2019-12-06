import React from "react";

import style from "./gamecase.module.css";
import { PLAYER } from "../../constants/gameCaseTypes";

export default ({ type, torch }) => {
  return (
    <div className={style.caseMainDiv}>
      {type === PLAYER && (
        <img className={style.image} src={require("./img/player.png")} alt="" />
      )}
    </div>
  );
};
