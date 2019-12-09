import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

import Layout from "../../components/Layout";
import Playground from "../../components/Playground";
import ActionPanel from "../../components/ActionPanel";

import {
  PLAYER,
  EMPTY,
  ENEMY,
  EXIT,
  OBSTACLE
} from "../../constants/gameCaseTypes";
import { UP, DOWN, LEFT, RIGHT } from "../../constants/actionMoves";
import { PLAYING, VICTORY, DEFEAT } from "../../constants/gameStates";

import style from "./game.module.css";

export default ({ location }) => {
  const initialMap = location.state.initialMap;

  const [dimensions, ] = useState(initialMap.dimensions);
  const [player, setPlayer] = useState(initialMap.player);
  const [exit, ] = useState(initialMap.exit);
  const [enemies, ] = useState(initialMap.enemies);
  const [obstacles, ] = useState(initialMap.obstacles);
  const [torches, ] = useState(initialMap.torches);

  const [map, setMap] = useState([]);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [result, setResult] = useState(PLAYING);

  useEffect(() => {
    const getTypeCase = (y, x) => {
      if (obstacles.some(item => item.y === y && item.x === x)) {
        return OBSTACLE;
      } else if (enemies.some(item => item.y === y && item.x === x)) {
        return ENEMY;
      } else if (player.x === x && player.y === y) {
        return PLAYER;
      } else if (exit.x === x && exit.y === y) {
        return EXIT;
      } else {
        return EMPTY;
      }
    };

    const isTorchOnCase = (y, x) => {
      return torches.some(item => item.y === y && item.x === x);
    };

    const newMap = [];
    for (var y = 0; y < dimensions.row; y++) {
      newMap.push([]);
      for (var x = 0; x < dimensions.col; x++) {
        newMap[y].push({ type: getTypeCase(y, x), torch: isTorchOnCase() });
      }
    }
    setMap(newMap);

    const newPossibleMoves = [];
    if (player.x === exit.x && player.y === exit.y) {
      setResult(VICTORY);
    } else {
      if (
        !obstacles.some(item => item.y === player.y - 1 && item.x === player.x)
      ) {
        newPossibleMoves.push(UP);
      }
      if (
        !obstacles.some(item => item.y === player.y + 1 && item.x === player.x)
      ) {
        newPossibleMoves.push(DOWN);
      }
      if (
        !obstacles.some(item => item.y === player.y && item.x === player.x - 1)
      ) {
        newPossibleMoves.push(LEFT);
      }
      if (
        !obstacles.some(item => item.y === player.y && item.x !== player.x + 1)
      ) {
        newPossibleMoves.push(RIGHT);
      }
    }
    setPossibleMoves(newPossibleMoves);
  }, [dimensions, player, enemies, exit, obstacles, torches]);

  const handleMove = move => {
    switch (move) {
      case UP:
        setPlayer({ y: player.y - 1, x: player.x });
        break;
      case DOWN:
        setPlayer({ y: player.y + 1, x: player.x });
        break;
      case LEFT:
        setPlayer({ y: player.y, x: player.x - 1 });
        break;
      case RIGHT:
        setPlayer({ y: player.y, x: player.x + 1 });
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      {result === VICTORY && (
        <div className={style.victory}>
          <p>Vous avez gagné</p>
          {/* <Link to="/game">
            <button>Recommencer</button>
          </Link> */}
          <Link to="/levels">
            <button>Quitter</button>
          </Link>
        </div>
      )}
      {result === DEFEAT && (
        <div className={style.victory}>
          <p>Vous vous êtes fait attraper</p>
          {/* <Link to="/game">
            <button>Recommencer</button>
          </Link> */}
          <Link to="/levels">
            <button>Quitter</button>
          </Link>
        </div>
      )}
      <Playground map={map} />
      <ActionPanel
        doMove={move => handleMove(move)}
        possibleMoves={possibleMoves}
      />
    </Layout>
  );
};
