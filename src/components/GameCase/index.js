import React from "react";

import Img from "react-image";

import style from "./gamecase.module.css";
import { PLAYER } from "../../constants/gameCaseTypes";

export default ({ type, torch }) => {
  return (
    <div className={style.caseMainDiv}>
      {type === PLAYER && <Img src={require("./img/player.png")} alt="" />}
    </div>
  );
};
