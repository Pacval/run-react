import React from "react";

import style from "./actionbutton.module.css";

export default ({ name, onClick, disabled }) => {
  return (
    <button
      className={style.actionButton}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};
