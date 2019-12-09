import React from "react";
import { Link } from "@reach/router";

import style from "./selectlevel.module.css";

export default () => {
  const initialMap = {
    id: 123,
    dimensions: { row: 4, col: 4 },
    player: { y: 0, x: 0 },
    exit: { y: 0, x: 3 },
    enemies: [{ y: 3, x: 0 }],
    obstacles: [
      { y: 2, x: 0 },
      { y: 2, x: 1 },
      { y: 2, x: 2 }
    ],
    torches: [{ y: 0, x: 1 }]
  };

  return (
    <div className={style.fullPage}>
      <Link to="/game" state={{ initialMap: initialMap }}>
        <button className={style.playButton}>Jouer</button>
      </Link>
    </div>
  );
};
