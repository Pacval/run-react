import React from "react";
import { Link } from "@reach/router";

import style from "./preview-story-level.module.css";

import { STORY } from "../../constants/levelTypes.js";

export default ({ level, completed }) => {
  return (
    <div className={style.previewMainDiv}>
      <Link
        to="/game"
        state={{ origin: STORY, level: level }}
        className={[
          style.levelButton,
          completed ? style.completed : style.notCompleted
        ].join(" ")}
      >
        {level.number}
      </Link>
    </div>
  );
};
