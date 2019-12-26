import React from "react";
import { Link } from "@reach/router";

import style from "./preview-story-level.module.css";

import { STORY } from "../../constants/levelTypes.js";

export default ({ level }) => {
  return (
    <div className={style.previewMainDiv}>
      <Link
        to="/game"
        state={{ origin: STORY, initialMap: level.content }}
        className={[
          style.levelButton,
          style.notCompleted
          // level.completed ? style.completed : style.notCompleted  => a remplacer via la table de progress
        ].join(" ")}
      >
        {level.number}
      </Link>
    </div>
  );
};
