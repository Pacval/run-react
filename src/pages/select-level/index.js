import React from "react";

import style from "./selectlevel.module.css";
import PreviewLevel from "../../components/PreviewLevel";

export default () => {
  const levels = [
    {
      id: 123,
      number: 1,
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
    },
    {
      id: 1000,
      number: 2,
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
    }
  ];

  return (
    <div className={style.fullPage}>
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
