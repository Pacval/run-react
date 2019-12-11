import React from "react";
import { Link } from "@reach/router";

import style from "./menu.module.css";

export default () => {
  return (
    <div className={style.fullPage}>
      <Link to="/levels" className={style.menuLink}>
        Jouer
      </Link>
      <Link to="/" className={style.menuLink}>
        Créer un niveau
      </Link>
    </div>
  );
};
