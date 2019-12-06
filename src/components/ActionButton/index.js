import React from "react";

import style from "./actionbutton.module.css";

export default ({ name, onClick }) => {
  return (
    <button className={style.actionButton} onClick={onClick}>
      {name}
    </button>
  );
};
