import React from "react";
import { Link } from "@reach/router";

import style from "./menu.module.css";

export default () => {
  return (
    <div className={style.fullPage}>
      <Link to="/select-story-level" className={style.menuLink}>
        Jouer (histoire)
      </Link>
      <Link to="/select-community-level" className={style.menuLink}>
        Jouer (niveaux&nbsp;communauté)
      </Link>
      <Link to="/create-level" className={style.menuLink}>
        Créer un niveau
      </Link>
      <Link to="/profile" className={style.menuLink}>
        Profil
      </Link>
    </div>
  );
};
