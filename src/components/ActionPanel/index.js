import React, { useEffect } from "react";
import keyboardKey from "keyboard-key";

import style from "./actionpanel.module.css";
import { UP, DOWN, LEFT, RIGHT, TORCH, AXE } from "../../constants/actionMoves";

import ActionButton from "../ActionButton";

export default ({ doMove, possibleMoves }) => {
  const handleUserKeyPress = event => {
    const key = keyboardKey.getKey(event);
    if (possibleMoves.includes(key)) {
      doMove(key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  return (
    <>
      <div className={style.movementPanel}>
        <div className={style.lineCentered}>
          <ActionButton
            name="Haut"
            onClick={() => doMove(UP)}
            disabled={!possibleMoves.includes(UP)}
          />
        </div>
        <div className={style.lineCentered}>
          <ActionButton
            name="Gauche"
            onClick={() => doMove(LEFT)}
            disabled={!possibleMoves.includes(LEFT)}
          />
          <ActionButton
            name="Bas"
            onClick={() => doMove(DOWN)}
            disabled={!possibleMoves.includes(DOWN)}
          />
          <ActionButton
            name="Droite"
            onClick={() => doMove(RIGHT)}
            disabled={!possibleMoves.includes(RIGHT)}
          />
        </div>
      </div>
      <div className={style.itemPanel}>
        <ActionButton name="Torche" disabled={!possibleMoves.includes(TORCH)} />
        <ActionButton name="Hache" disabled={!possibleMoves.includes(AXE)} />
      </div>
    </>
  );
};
