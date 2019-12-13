import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

import Layout from "../../components/Layout";
import Playground from "../../components/Playground";
import ActionPanel from "../../components/ActionPanel";

import useLevels from "../../utils/useLevels";
import style from "./game.module.css";

import { UP, DOWN, LEFT, RIGHT } from "../../constants/actionMoves";
import { PLAYING, VICTORY, DEFEAT } from "../../constants/gameStates";

export default ({ location }) => {
  const initialMap = location.state.initialMap;

  const { levels, setLevels } = useLevels();

  const [map, setMap] = useState(initialMap);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [result, setResult] = useState(PLAYING);

  useEffect(() => {
    const newPossibleMoves = [];

    // ATTENTION on ne passe ici que quand la partie n'est pas finie. Sinon boucle infinie de render
    if (result === PLAYING) {
      // condition de victoire
      if (map.player.x === map.exit.x && map.player.y === map.exit.y) {
        setResult(VICTORY);
        setLevels(
          levels.map(item =>
            item.id === map.id ? { ...item, completed: true } : item
          )
        );
      } else {
        if (
          !map.obstacles.some(
            item => item.y === map.player.y - 1 && item.x === map.player.x
          )
        ) {
          newPossibleMoves.push(UP);
        }
        if (
          !map.obstacles.some(
            item => item.y === map.player.y + 1 && item.x === map.player.x
          )
        ) {
          newPossibleMoves.push(DOWN);
        }
        if (
          !map.obstacles.some(
            item => item.y === map.player.y && item.x === map.player.x - 1
          )
        ) {
          newPossibleMoves.push(LEFT);
        }
        if (
          !map.obstacles.some(
            item => item.y === map.player.y && item.x !== map.player.x + 1
          )
        ) {
          newPossibleMoves.push(RIGHT);
        }
      }
    }
    setPossibleMoves(newPossibleMoves);
  }, [map, levels, setLevels, result]);

  const resetGame = () => {
    setMap(initialMap);

    setResult(PLAYING);
  };

  const handleMove = move => {
    switch (move) {
      case UP:
        setMap({ ...map, player: { ...map.player, y: map.player.y - 1 } });
        break;
      case DOWN:
        setMap({ ...map, player: { ...map.player, y: map.player.y + 1 } });
        break;
      case LEFT:
        setMap({ ...map, player: { ...map.player, x: map.player.x - 1 } });
        break;
      case RIGHT:
        setMap({ ...map, player: { ...map.player, x: map.player.x + 1 } });
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
          <button onClick={() => resetGame()}>Recommencer</button>
          <Link to="/levels">
            <button>Quitter</button>
          </Link>
        </div>
      )}
      {result === DEFEAT && (
        <div className={style.victory}>
          <p>Vous vous êtes fait attraper</p>
          <button onClick={() => resetGame()}>Recommencer</button>
          <Link to="/levels">
            <button>Quitter</button>
          </Link>
        </div>
      )}
      <div className={style.playgroundDiv}>
        <Link to="/levels">Quitter</Link>
        <Playground map={map} />
      </div>
      <div className={style.actionPanelDiv}>
        <ActionPanel
          doMove={move => handleMove(move)}
          possibleMoves={possibleMoves}
        />
      </div>
    </Layout>
  );
};
