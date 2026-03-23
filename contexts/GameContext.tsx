import React, { createContext, useContext, useState } from 'react';

interface GameState {
  player1Points: number;
  player2Points: number;
  lastPointsAdded: number;
  lastPointsAddedForPlayer: number;
  player1PointsHistory: number[];
  player2PointsHistory: number[];
  player1TurnPoints: number;
  player2TurnPoints: number;
  setPlayer1Points: (_points: number) => void;
  setPlayer2Points: (_points: number) => void;
  setLastPointsAdded: (_points: number) => void;
  setLastPointsAddedForPlayer: (_player: number) => void;
  setPlayer1PointsHistory: (_history: number[]) => void;
  setPlayer2PointsHistory: (_history: number[]) => void;
  setPlayer1TurnPoints: (_points: number) => void;
  setPlayer2TurnPoints: (_points: number) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameState | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);
  const [lastPointsAdded, setLastPointsAdded] = useState(0);
  const [lastPointsAddedForPlayer, setLastPointsAddedForPlayer] = useState(0);
  const [player1PointsHistory, setPlayer1PointsHistory] = useState<number[]>([]);
  const [player2PointsHistory, setPlayer2PointsHistory] = useState<number[]>([]);
  const [player1TurnPoints, setPlayer1TurnPoints] = useState(0);
  const [player2TurnPoints, setPlayer2TurnPoints] = useState(0);

  const resetGame = () => {
    setPlayer1Points(0);
    setPlayer2Points(0);
    setLastPointsAdded(0);
    setLastPointsAddedForPlayer(0);
    setPlayer1PointsHistory([]);
    setPlayer2PointsHistory([]);
    setPlayer1TurnPoints(0);
    setPlayer2TurnPoints(0);
  };

  return (
    <GameContext.Provider
      value={{
        player1Points,
        player2Points,
        lastPointsAdded,
        lastPointsAddedForPlayer,
        player1PointsHistory,
        player2PointsHistory,
        player1TurnPoints,
        player2TurnPoints,
        setPlayer1Points,
        setPlayer2Points,
        setLastPointsAdded,
        setLastPointsAddedForPlayer,
        setPlayer1PointsHistory,
        setPlayer2PointsHistory,
        setPlayer1TurnPoints,
        setPlayer2TurnPoints,
        resetGame,
      }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
}
