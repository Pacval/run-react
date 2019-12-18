import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import { confirmAlert } from "react-confirm-alert";
import Alert from "react-s-alert";

import style from "./create-level.module.css";

import Playground from "../../components/Playground";
import GameCase from "../../components/GameCase";
import {
  PLAYER,
  EMPTY,
  EXIT,
  ENEMY,
  OBSTACLE
} from "../../constants/gameCaseTypes";

export default ({ location }) => {
  const initialMap = {
    dimensions: { row: 3, col: 3 },
    player: { y: null, x: null },
    exit: { y: null, x: null },
    enemies: [],
    obstacles: [],
    torches: []
  };

  const [map, setMap] = useState(
    !!location.state.level ? location.state.level : initialMap
  );
  const [selectedCase, setSelectedCase] = useState({ y: 0, x: 0 });

  const handleChangeSize = ({ name, value }) => {
    if (value >= 3 && value <= 10) {
      setMap({ ...map, dimensions: { ...map.dimensions, [name]: value } });
    }
  };

  const handleSelectCase = ({ row, col }) => {
    setSelectedCase({ y: row, x: col });
  };

  const handleAddCaseEmpty = () => {
    setMap(removePreviousCase());
  };

  const handleAddCasePlayer = () => {
    const toto = removePreviousCase();
    setMap({ ...toto, player: { y: selectedCase.y, x: selectedCase.x } });
  };

  const handleAddCaseExit = () => {
    const toto = removePreviousCase();
    setMap({ ...toto, exit: { y: selectedCase.y, x: selectedCase.x } });
  };

  const handleAddCaseEnemy = () => {
    const toto = removePreviousCase();
    setMap({
      ...toto,
      enemies: map.enemies.concat({ y: selectedCase.y, x: selectedCase.x })
    });
  };

  const handleAddCaseObstacle = () => {
    const toto = removePreviousCase();
    setMap({
      ...toto,
      obstacles: map.obstacles.concat({ y: selectedCase.y, x: selectedCase.x })
    });
  };

  const removePreviousCase = () => {
    if (map.player.y === selectedCase.y && map.player.x === selectedCase.x) {
      return { ...map, player: { y: undefined, x: undefined } };
    } else if (map.exit.y === selectedCase.y && map.exit.x === selectedCase.x) {
      return { ...map, exit: { y: undefined, x: undefined } };
    } else if (
      map.enemies.some(
        element => element.y === selectedCase.y && element.x === selectedCase.x
      )
    ) {
      return {
        ...map,
        enemies: map.enemies.filter(
          element =>
            element.y !== selectedCase.y || element.x !== selectedCase.x
        )
      };
    } else if (
      map.obstacles.some(
        element => element.y === selectedCase.y && element.x === selectedCase.x
      )
    ) {
      return {
        ...map,
        obstacles: map.obstacles.filter(
          element =>
            element.y !== selectedCase.y || element.x !== selectedCase.x
        )
      };
    } else {
      return map;
    }
  };

  const confirmReinitialize = () => {
    confirmAlert({
      title: "Réinitialisation",
      message: "Valider la réinitialisation ?",
      buttons: [
        {
          label: "Oui",
          onClick: () => reinitialize()
        },
        {
          label: "Non",
          onClick: () => {}
        }
      ]
    });
  };

  const reinitialize = () => {
    setMap({
      dimensions: { row: map.dimensions.row, col: map.dimensions.col },
      player: { y: null, x: null },
      exit: { y: null, x: null },
      enemies: [],
      obstacles: [],
      torches: []
    });
  };

  const testLevel = () => {
    if (
      map.player.x === null ||
      map.player.y === null ||
      map.player.x >= map.dimensions.col ||
      map.player.y >= map.dimensions.row
    ) {
      Alert.error("Votre niveau doit contenir une case JOUEUR", {
        timeout: 2000
      });
    } else if (
      map.exit.x === null ||
      map.exit.y === null ||
      map.exit.x >= map.dimensions.col ||
      map.exit.y >= map.dimensions.row
    ) {
      Alert.error("Votre niveau doit contenir une case SORTIE", {
        timeout: 2000
      });
    } else {
      const filteredLevel = {
        dimensions: { ...map.dimensions },
        player: { ...map.player },
        exit: { ...map.exit },
        enemies: map.enemies.filter(
          item => item.x < map.dimensions.col && item.y < map.dimensions.row
        ),
        obstacles: map.obstacles.filter(
          item => item.x < map.dimensions.col && item.y < map.dimensions.row
        ),
        torches: map.torches.filter(
          item => item.x < map.dimensions.col && item.y < map.dimensions.row
        )
      };

      navigate("/test-game", { state: { level: filteredLevel } });
    }
  };

  return (
    <div className={style.fullPage}>
      <div className={style.palette}>
        <Link to="/">Retourner au menu</Link>
        <div>
          <button onClick={confirmReinitialize}>Réinitialiser</button>
        </div>
        <label>
          Hauteur : {map.dimensions.row}
          <button
            onClick={() =>
              handleChangeSize({ name: "row", value: map.dimensions.row - 1 })
            }
          >
            -
          </button>
          <button
            onClick={() =>
              handleChangeSize({ name: "row", value: map.dimensions.row + 1 })
            }
          >
            +
          </button>
        </label>
        <label>
          Largeur : {map.dimensions.col}
          <button
            onClick={() =>
              handleChangeSize({ name: "col", value: map.dimensions.col - 1 })
            }
          >
            -
          </button>
          <button
            onClick={() =>
              handleChangeSize({ name: "col", value: map.dimensions.col + 1 })
            }
          >
            +
          </button>
        </label>

        <GameCase caseType={EMPTY} onClick={handleAddCaseEmpty} />
        <GameCase caseType={PLAYER} onClick={handleAddCasePlayer} />
        <GameCase caseType={EXIT} onClick={handleAddCaseExit} />
        <GameCase caseType={ENEMY} onClick={handleAddCaseEnemy} />
        <GameCase caseType={OBSTACLE} onClick={handleAddCaseObstacle} />
      </div>
      <div className={style.rightPanel}>
        <div className={style.playground}>
          <Playground
            map={map}
            selectedCase={selectedCase}
            onClick={handleSelectCase}
          />
        </div>
        <div className={style.validate}>
          <button onClick={testLevel}>Tester ce niveau</button>
        </div>
      </div>
    </div>
  );
};
