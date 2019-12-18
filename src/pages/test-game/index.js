import React, { useState, useEffect } from "react";
import { Link, navigate } from "@reach/router";
import Alert from "react-s-alert";

import Layout from "../../components/Layout";
import Playground from "../../components/Playground";
import ActionPanel from "../../components/ActionPanel";

import useLevels from "../../utils/useLevels";
import style from "./test-game.module.css";

import { UP, DOWN, LEFT, RIGHT } from "../../constants/actionMoves";
import { PLAYING, VICTORY, DEFEAT } from "../../constants/gameStates";

export default ({ location }) => {
  const level = location.state.level;

  const { levels, setLevels } = useLevels();

  const [map, setMap] = useState(level);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [result, setResult] = useState(PLAYING);

  useEffect(() => {
    const newPossibleMoves = [];

    // ATTENTION on ne passe ici que quand la partie n'est pas finie. Sinon boucle infinie de render
    if (result === PLAYING) {
      // condition de victoire
      if (map.player.x === map.exit.x && map.player.y === map.exit.y) {
        setResult(VICTORY);
      } else {
        if (
          map.player.y > 0 &&
          !map.obstacles.some(
            item => item.y === map.player.y - 1 && item.x === map.player.x
          )
        ) {
          newPossibleMoves.push(UP);
        }
        if (
          map.player.y < map.dimensions.row - 1 &&
          !map.obstacles.some(
            item => item.y === map.player.y + 1 && item.x === map.player.x
          )
        ) {
          newPossibleMoves.push(DOWN);
        }
        if (
          map.player.x > 0 &&
          !map.obstacles.some(
            item => item.y === map.player.y && item.x === map.player.x - 1
          )
        ) {
          newPossibleMoves.push(LEFT);
        }
        if (
          map.player.x < map.dimensions.col - 1 &&
          !map.obstacles.some(
            item => item.y === map.player.y && item.x === map.player.x + 1
          )
        ) {
          newPossibleMoves.push(RIGHT);
        }
      }
    }
    setPossibleMoves(newPossibleMoves);
  }, [map, result]);

  const resetGame = () => {
    setMap(level);
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

  const saveLevel = () => {
    const levelToSave = {
      id: Math.max(...levels.map(o => o.id)) + 1,
      number: Math.max(...levels.map(o => o.number)) + 1,
      completed: false,
      ...level
    };

    setLevels(levels.concat(levelToSave));
    Alert.success(
      "Votre niveau a été enregistré ! Numéro : " + levelToSave.number,
      {
        timeout: 2000
      }
    );
    navigate("/levels");
  };

  return (
    <Layout>
      {result === VICTORY && (
        <div className={style.victory}>
          <p>
            Vous avez valider le niveau. Souhaitez-vous l'enregistrer ? Vous
            pouvez aussi continuer à l'éditer
          </p>
          <button onClick={() => resetGame()}>Recommencer</button>
          <Link to="/create-level" state={{ level: level }}>
            <button>Retour édition</button>
          </Link>
          &nbsp;
          <button onClick={saveLevel}>Enregistrer ce niveau</button>
        </div>
      )}
      {result === DEFEAT && (
        <div className={style.victory}>
          <p>Vous n'avez pas réussi à valider le niveau</p>
          <button onClick={() => resetGame()}>Recommencer</button>
          <Link to="/create-level" state={{ level: level }}>
            <button>Retour édition</button>
          </Link>
        </div>
      )}
      <div className={style.playgroundDiv}>
        <Link to="/create-level" state={{ level: level }}>
          Retour à l'édition du niveau
        </Link>
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
