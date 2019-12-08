import React, { useState, useEffect } from "react";

import Layout from "../../components/Layout";
import Playground from "../../components/Playground";
import ActionPanel from "../../components/ActionPanel";

import { PLAYER, EMPTY, ENEMY, EXIT } from "../../constants/gameCaseTypes";
import { UP, DOWN } from "../../constants/actionMoves";

export default () => {

  const [player, setPlayer] = useState({ y: 0, x: 0 });
  const [map, setMap] = useState([{
    rowIndex: 0,
    data: [
      { colIndex: 0, type: PLAYER, torch: false },
      { colIndex: 1, type: EMPTY, torch: false },
      { colIndex: 2, type: EXIT, torch: false }
    ]
  },
  {
    rowIndex: 1,
    data: [
      { colIndex: 0, type: EMPTY, torch: false },
      { colIndex: 1, type: EMPTY, torch: false },
      { colIndex: 2, type: EMPTY, torch: false }
    ]
  },
  {
    rowIndex: 2,
    data: [
      { colIndex: 0, type: ENEMY, torch: false },
      { colIndex: 1, type: EMPTY, torch: false },
      { colIndex: 2, type: EMPTY, torch: false }
    ]
  }]);

  useEffect(() => {
    //const newMap = 
    //setMap(/* nouvelle map */);
  }, [player]);

  const handleMove = move => {
    switch (move) {
      case UP:
        setPlayer({ y: player.y - 1, x: player.x });
        break;
      case DOWN:
        setPlayer({ y: player.y + 1, x: player.x });
        break;

      default:
        break;
    }
  };

  return (
    <Layout>
      <Playground map={map} />
      <ActionPanel doMove={move => handleMove(move)} possibleMoves={[DOWN]} />
    </Layout>
  );
};
