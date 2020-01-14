import React from "react";
import { Link } from "@reach/router";

import style from "./preview-community-level.module.css";

import { COMMUNITY } from "../../constants/levelTypes.js";

export default ({ level }) => {
  return (
    <div className={style.previewMainDiv}>
      <Link
        to="/game"
        state={{ origin: COMMUNITY, level: level }}
        className={[
          style.levelButton,
          style.notCompleted
          // level.completed ? style.completed : style.notCompleted  => a remplacer via la table de progress
        ].join(" ")}
      >
        {level.name}
        <br />
        {!!level.creator && <>par {level.creator}</>}
      </Link>
    </div>
  );
};
