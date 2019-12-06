import React from "react";

import style from "./actionpanel.module.css";
import { UP, DOWN } from "../../constants/actionMoves";

import ActionButton from "../ActionButton";

export default ({ doMove, possibleMoves }) => {
  return (
    <div className={style.actionPanelMainDiv}>
      <div className={style.movementPanel}>
        <div className={style.lineCentered}>
          <ActionButton
            name="Haut"
            onClick={() => doMove("UP")}
            disabled={possibleMoves.includes(UP)}
          />
        </div>
        <div className={style.lineCentered}>
          <ActionButton name="Gauche" onClick={() => doMove("LEFT")} />

          <ActionButton
            name="Bas"
            onClick={() => doMove("DOWN")}
            disabled={possibleMoves.includes(DOWN)}
          />

          <ActionButton name="Droite" onClick={() => doMove("RIGHT")} />
        </div>
      </div>
      <div className={style.itemPanel}>
        <ActionButton name="Torche" />
        <ActionButton name="Hache" />
      </div>
    </div>
  );
};
