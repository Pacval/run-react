import React from "react";
import { Link } from "@reach/router";
import { FaRedo } from "react-icons/fa";

import style from "./select-community-level.module.css";

import useCommunityLevels from "../../utils/useCommunityLevels";
import { SUCCESS, LOADING, FAILURE } from "../../constants/apiStates";
import PreviewCommunityLevel from "../../components/PreviewCommunityLevel";

export default () => {
  const { levels, status, reload } = useCommunityLevels();

  return (
    <div className={style.fullPage}>
      <Link to="/">Revenir au menu</Link>
      <h1 className={style.title}>
        Sélection niveau <FaRedo onClick={reload} />
      </h1>
      {status === LOADING && <span>Chargement des niveaux...</span>}
      {status === FAILURE && <span>Erreur lors du chargement des niveaux</span>}
      {status === SUCCESS && !levels.length && <span>Aucun niveau trouvé</span>}
      {status === SUCCESS && !!levels.length && (
        <div className={style.divLevels}>
          {levels.map(level => (
            <PreviewCommunityLevel key={level.id} level={level} />
          ))}
        </div>
      )}
    </div>
  );
};
