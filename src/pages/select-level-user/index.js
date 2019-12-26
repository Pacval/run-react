import React from "react";
import { Link } from "@reach/router";

import style from "./select-level-user.module.css";

import PreviewLevel from "../../components/PreviewLevel";
// import useLevels from "../../utils/useLevels";
import { SUCCESS, LOADING, FAILURE } from "../../constants/api";

export default () => {
  // const { levels, status } = useLevels();

  return (
    <div className={style.fullPage}>
      <Link to="/">Revenir au menu</Link>
      <h1 className={style.title}>Sélection niveau</h1>
      {/* {status === LOADING && <span>Chargement des niveaux...</span>}
      {status === FAILURE && <span>Erreur lors du chargement des niveaux</span>}
      {status === SUCCESS && (
        <div className={style.divLevels}>
          {levels
            .sort((a, b) => a.number - b.number)
            .map(level => (
              <PreviewLevel key={level.id} level={level} />
            ))}
        </div>
      )} */}
    </div>
  );
};
