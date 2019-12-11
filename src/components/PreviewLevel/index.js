import React from "react";
import { Link } from "@reach/router";

import style from "./previewlevel.module.css";

export default ({ level }) => {
  return (
    <div className={style.previewMainDiv}>
      <Link
        to="/game"
        state={{ initialMap: level }}
        className={[
          style.levelButton,
          level.completed ? style.completed : style.notCompleted
        ].join(" ")}
      >
        {level.number}
      </Link>
    </div>
  );
};
