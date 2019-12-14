import React from "react";

import style from "./playground.module.css";

import GameCase from "../GameCase";
import { OBSTACLE, ENEMY, PLAYER, EXIT, EMPTY } from "../../constants/gameCaseTypes";

export default ({ map, selectedCase, onClick }) => {

  const getCaseType = ({ row, col }) => {
    if (map.obstacles.some(item => item.y === row && item.x === col)) {
      return OBSTACLE;
    } else if (map.enemies.some(item => item.y === row && item.x === col)) {
      return ENEMY;
    } else if (map.player.y === row && map.player.x === col) {
      return PLAYER;
    } else if (map.exit.y === row && map.exit.x === col) {
      return EXIT;
    } else {
      return EMPTY;
    }
  }

  const isSelectedCase = ({ row, col }) => {
    return !!selectedCase && selectedCase.y === row && selectedCase.x === col;
  }

  return (
    <>
      {[...new Array(map.dimensions.row)].map((row, rowIndex) => {
        return (
          <div key={rowIndex} className={style.row}>
            {[...new Array(map.dimensions.col)].map((col, colIndex) => {
              return (<GameCase
                key={colIndex}
                caseType={getCaseType({ row: rowIndex, col: colIndex })}
                selected={isSelectedCase({ row: rowIndex, col: colIndex })}
                onClick={() => onClick({ row: rowIndex, col: colIndex })}
              />)
            })}
          </div>
        );
      })}
    </>
  );
};
