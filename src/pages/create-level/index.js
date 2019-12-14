import React, { useState } from "react";
import { Link } from "@reach/router"

import style from "./create-level.module.css";

import Playground from "../../components/Playground";
import GameCase from "../../components/GameCase";
import { PLAYER, EMPTY, EXIT, ENEMY, OBSTACLE } from "../../constants/gameCaseTypes";

export default () => {

  const initialMap = {
    dimensions: { row: 3, col: 3 },
    player: { y: undefined, x: undefined },
    exit: { y: undefined, x: undefined },
    enemies: [],
    obstacles: [],
    torches: []
  };

  const [map, setMap] = useState(initialMap);
  const [selectedCase, setSelectedCase] = useState({ y: 0, x: 0 });

  const handleChangeSize = ({ name, value }) => {
    if (value >= 3 && value <= 10) {
      setMap({ ...map, dimensions: { ...map.dimensions, [name]: value } });
    }
  }

  const handleSelectCase = ({ row, col }) => {
    // setSelectedCase({ y: row, x: col });
  }

  const handleAddCaseEmpty = () => {
    setMap(removePreviousCase());
  }

  const handleAddCasePlayer = () => {
    const toto = removePreviousCase();
    setMap({ ...toto, player: { y: selectedCase.y, x: selectedCase.x } });
  }

  const handleAddCaseExit = () => {
    const toto = removePreviousCase();
    setMap({ ...toto, exit: { y: selectedCase.y, x: selectedCase.x } });
  }

  const handleAddCaseEnemy = () => {
    const toto = removePreviousCase();
    setMap({ ...toto, enemies: map.enemies.concat({ y: selectedCase.y, x: selectedCase.x }) });
  }

  const handleAddCaseObstacle = () => {
    const toto = removePreviousCase();
    setMap({ ...toto, obstacles: map.obstacles.concat({ y: selectedCase.y, x: selectedCase.x }) });
  }

  const removePreviousCase = () => {
    if (map.player.y === selectedCase.y && map.player.x === selectedCase.x) {
      return { ...map, player: { y: undefined, x: undefined } };

    } else if (map.exit.y === selectedCase.y && map.exit.x === selectedCase.x) {
      return { ...map, exit: { y: undefined, x: undefined } };

    } else if (map.enemies.some(element => element.y === selectedCase.y && element.x === selectedCase.x)) {
      return { ...map, enemies: map.enemies.filter(element => element.y !== selectedCase.y && element.x !== selectedCase.x) };

    } else if (map.obstacles.some(element => element.y === selectedCase.y && element.x === selectedCase.x)) {
      return { ...map, obstacles: map.obstacles.filter(element => element.y !== selectedCase.y && element.x !== selectedCase.x) };

    } else {
      return map;
    }
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

        <GameCase caseType={EMPTY} onClick={handleAddCaseEmpty} />
        <GameCase caseType={PLAYER} onClick={handleAddCasePlayer} />
        <GameCase caseType={EXIT} onClick={handleAddCaseExit} />
        <GameCase caseType={ENEMY} onClick={handleAddCaseEnemy} />
        <GameCase caseType={OBSTACLE} onClick={handleAddCaseObstacle} />

      </div>
      <div className={style.rightPanel}>
        <div className={style.playground}>
          <Playground map={map} selectedCase={selectedCase} onClick={handleSelectCase} />
        </div>
        <div className={style.validate}>
          <button>Enregistrer ce niveau</button>
        </div>
      </div>
    </div>
  );
}