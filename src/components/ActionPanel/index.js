import React from "react";

import style from "./actionpanel.module.css";

import ActionButton from "../ActionButton";

export default () => {
  const goUp = () => {
    console.log("UP");
  };

  const goDown = () => {
    console.log("DOWN");
  };

  const goLeft = () => {
    console.log("LEFT");
  };

  const goRight = () => {
    console.log("RIGHT");
  };

  return (
    <div className={style.actionPanelMainDiv}>
      <div className={style.movementPanel}>
        <div className={style.lineCentered}>
          <ActionButton name="Haut" onClick={() => goUp()} />
        </div>
        <div className={style.lineCentered}>
          <ActionButton name="Gauche" onClick={() => goLeft()} />
          <ActionButton name="Bas" onClick={() => goDown()} />
          <ActionButton name="Droite" onClick={() => goRight()} />
        </div>
      </div>
      <div className={style.itemPanel}>
        <ActionButton name="Torche" />
        <ActionButton name="Hache" />
      </div>
    </div>
  );
};
