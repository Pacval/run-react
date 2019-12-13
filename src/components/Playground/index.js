import React from "react";

import style from "./playground.module.css";

import GameCase from "../GameCase";

export default ({ map, onClick }) => {
  return (
    <>
      {[...new Array(map.dimensions.row)].map((row, rowIndex) => {
        return (
          <div key={rowIndex} className={style.row}>
            {[...new Array(map.dimensions.col)].map((col, colIndex) => {
              return (<GameCase
                key={colIndex}
                row={rowIndex}
                col={colIndex}
                map={map}
                onClick={() => onClick({ row: rowIndex, col: colIndex })}
              />)
            })}
          </div>
        );
      })}
    </>
  );
};
