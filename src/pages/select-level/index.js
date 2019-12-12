import React from "react";
import {Link} from "@reach/router"

import style from "./select-level.module.css";

import PreviewLevel from "../../components/PreviewLevel";
import useLevels from "../../utils/useLevels";

export default () => {
  const { levels } = useLevels();

  return (
    <div className={style.fullPage}>
      <Link to="/">Revenir au menu</Link>
      <h1 className={style.title}>Sélection niveau</h1>
      <div className={style.divLevels}>
        {levels
          .sort((a, b) => a.number - b.number)
          .map(level => (
            <PreviewLevel key={level.id} level={level} />
          ))}
      </div>
    </div>
  );
};
