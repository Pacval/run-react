import React from "react";
import { Link } from "@reach/router";

import style from "./select-story-level.module.css";

import { SUCCESS, LOADING, FAILURE } from "../../constants/api";
import useStoryLevels from "../../utils/useStoryLevels";
import PreviewStoryLevel from "../../components/PreviewStoryLevel";
import useUser from "../../utils/useUser";

export default () => {
  const { levels, status } = useStoryLevels();
  const { userProgressStory = [] } = useUser();

  return (
    <div className={style.fullPage}>
      <Link to="/">Revenir au menu</Link>
      <h1 className={style.title}>Sélection niveau</h1>
      {status === LOADING && <span>Chargement des niveaux...</span>}
      {status === FAILURE && <span>Erreur lors du chargement des niveaux</span>}
      {status === SUCCESS && (
        <div className={style.divLevels}>
          {levels
            .sort((a, b) => a.number - b.number)
            .map(level => (
              <PreviewStoryLevel
                key={level.id}
                level={level}
                completed={!!userProgressStory.find(lvl => lvl.id === level.id)}
              />
            ))}
        </div>
      )}
    </div>
  );
};
