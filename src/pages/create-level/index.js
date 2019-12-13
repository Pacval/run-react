import React, { useState } from "react";
import { Link } from "@reach/router"

import style from "./create-level.module.css";

import Playground from "../../components/Playground";

export default () => {

  const initialMap = {
    dimensions: { row: 3, col: 3 },
    selectedCase: { row: undefined, col: undefined }, // attribut spécial pour la création de niveaux
    player: { y: undefined, x: undefined },
    exit: { y: undefined, x: undefined },
    enemies: [],
    obstacles: [],
    torches: []
  };

  const [map, setMap] = useState(initialMap);

  const handleChangeSize = ({ name, value }) => {
    if (value >= 3 && value <= 10) {
      setMap({ ...map, dimensions: { ...map.dimensions, [name]: value } });
    }
  }

  const handleSelectCase = ({ row, col }) => {
    setMap({ ...map, selectedCase: { y: row, x: col } });
  }

  return (
    <div className={style.fullPage}>
      <div className={style.palette}>
        <Link to="/">Retourner au menu</Link>
        <label>
          Hauteur : {map.dimensions.row}
          <button onClick={() => handleChangeSize({ name: "row", value: map.dimensions.row - 1 })}>-</button>
          <button onClick={() => handleChangeSize({ name: "row", value: map.dimensions.row + 1 })}>+</button>
        </label>
        <label>
          Largeur : {map.dimensions.col}
          <button onClick={() => handleChangeSize({ name: "col", value: map.dimensions.col - 1 })}>-</button>
          <button onClick={() => handleChangeSize({ name: "col", value: map.dimensions.col + 1 })}>+</button>
        </label>

      </div>
      <div className={style.rightPanel}>
        <div className={style.playground}>
          <Playground map={map} onClick={handleSelectCase} />
        </div>
        <div className={style.validate}>
          <button>Enregistrer ce niveau</button>
        </div>
      </div>
    </div>
  );
}