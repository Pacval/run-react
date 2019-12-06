import React from "react";

import Layout from "../../components/Layout";
import Playground from "../../components/Playground";
import ActionPanel from "../../components/ActionPanel";

import { PLAYER, EMPTY, ENEMY, EXIT } from "../../constants/gameCaseTypes";
import { UP, DOWN } from "../../constants/actionMoves";

export default () => {
  const map = [
    {
      index: 0,
      data: [
        { y: 0, x: 0, type: PLAYER, torch: false },
        { y: 0, x: 1, type: EMPTY, torch: false },
        { y: 0, x: 2, type: EXIT, torch: false }
      ]
    },
    {
      index: 1,
      data: [
        { y: 1, x: 0, type: EMPTY, torch: false },
        { y: 1, x: 1, type: EMPTY, torch: false },
        { y: 1, x: 2, type: EMPTY, torch: false }
      ]
    },
    {
      index: 2,
      data: [
        { y: 2, x: 0, type: ENEMY, torch: false },
        { y: 2, x: 1, type: EMPTY, torch: false },
        { y: 2, x: 2, type: EMPTY, torch: false }
      ]
    }
  ];

  const handleMove = move => {
    console.log(move);
  };

  return (
    <Layout>
      <Playground map={map} />
      <ActionPanel doMove={move => handleMove(move)} possibleMoves={[DOWN]} />
    </Layout>
  );
};
