import React from "react";
import { Link } from "@reach/router";

import style from "./selectlevel.module.css";

export default () => {
  return (
    <div className={style.fullPage}>
      <Link to="/game/123">
        <button className={style.playButton}>Jouer</button>
      </Link>
    </div>
  );
};
