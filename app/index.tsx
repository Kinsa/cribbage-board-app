import AddButton from '@/components/AddButton';
import CribbageBoard from '@/components/CribbageBoard';
import TurnScore from '@/components/CurrentPointsValue';
import TotalScore from '@/components/TotalPointsValue';
import UIButton from '@/components/UIButton';
import { useIOSShakeToUndo } from '@/utils';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);
  const [player1TurnPoints, setPlayer1TurnPoints] = useState(0);
  const [player2TurnPoints, setPlayer2TurnPoints] = useState(0);
  const [lastPointsAdded, setLastPointsAdded] = useState(0);
  const [lastPointsAddedForPlayer, setLastPointsAddedForPlayer] = useState(0);
  const [player1PointsHistory, setPlayer1PointsHistory] = useState<number[]>([]);
  const [player2PointsHistory, setPlayer2PointsHistory] = useState<number[]>([]);

  const checkIfWon = (player: number, newPoints: number) => {
    if (newPoints > 120) {
      const otherPlayerPoints = player === 1 ? player2Points : player1Points;
      const winner = player === 1 ? 'Green' : 'Blue';

      if (otherPlayerPoints <= 60) {
        console.log('Double skunk!');
      } else if (otherPlayerPoints <= 90) {
        console.log('Skunk!');
      } else {
        console.log(`Player ${winner} won!`);
      }

      setTimeout(() => {
        resetGame();
      }, 5000);
    }
  };

  const resetGame = () => {
    setPlayer1Points(0);
    setPlayer2Points(0);
    setLastPointsAdded(0);
    setLastPointsAddedForPlayer(0);
    setPlayer1PointsHistory([]);
    setPlayer2PointsHistory([]);
    console.log('Game reset');
  };

  interface AddPointsToBoardProps {
    player: number;
    points: number;
  }

  const addPointsToBoard = ({ player, points }: AddPointsToBoardProps) => {
    console.log(`Player ${player} added ${points} points`);

    if (player === 1) {
      if (lastPointsAddedForPlayer === 1) {
        const newPoints = player1TurnPoints + points;
        setPlayer1TurnPoints(newPoints);
        console.log(`Player 1 turn points ${newPoints}`);
      } else {
        setPlayer1TurnPoints(points);
        console.log(`Player 1 turn points ${points}`);
      }

      const newPoints = player1Points + points;
      setPlayer1Points(newPoints);
      setLastPointsAdded(points);
      setLastPointsAddedForPlayer(1);
      setPlayer1PointsHistory([...player1PointsHistory, points]);
      console.log(`Player 1 points ${newPoints}`);
      checkIfWon(player, newPoints);
    }

    if (player === 2) {
      if (lastPointsAddedForPlayer === 2) {
        const newPoints = player2TurnPoints + points;
        setPlayer2TurnPoints(newPoints);
        console.log(`Player 2 turn points ${newPoints}`);
      } else {
        setPlayer2TurnPoints(points);
        console.log(`Player 2 turn points ${points}`);
      }

      const newPoints = player2Points + points;
      setPlayer2Points(newPoints);
      setLastPointsAdded(points);
      setLastPointsAddedForPlayer(2);
      setPlayer2PointsHistory([...player2PointsHistory, points]);
      console.log(`Player 2 points ${newPoints}`);
      checkIfWon(player, newPoints);
    }
  };

  const handleShakeToUndo = () => {
    if (lastPointsAddedForPlayer === 1) {
      const newPoints = player1Points - lastPointsAdded;
      setPlayer1Points(newPoints);
      setLastPointsAdded(newPoints);
      setLastPointsAddedForPlayer(0);
      setPlayer1PointsHistory(player1PointsHistory.slice(0, -1));
      console.log(`Player 1 points ${newPoints}`);
    } else if (lastPointsAddedForPlayer === 2) {
      const newPoints = player2Points - lastPointsAdded;
      setPlayer2Points(newPoints);
      setLastPointsAdded(newPoints);
      setLastPointsAddedForPlayer(0);
      setPlayer2PointsHistory(player2PointsHistory.slice(0, -1));
      console.log(`Player 2 points ${newPoints}`);
    }
  };

  const handleTapToUndo = player => {
    if (player === 1) {
      if (player1Points === 0 || player1PointsHistory.length === 0) {
        return;
      }
      const pointsToRemove = player1PointsHistory[player1PointsHistory.length - 1];
      const newPoints = player1Points - pointsToRemove;
      setPlayer1Points(newPoints);
      setPlayer1PointsHistory(player1PointsHistory.slice(0, -1));
      if (player1TurnPoints >= pointsToRemove) {
        setPlayer1TurnPoints(player1TurnPoints - pointsToRemove);
      } else {
        setPlayer1TurnPoints(0);
      }
      console.log(`Player 1 points ${newPoints}`);
    } else if (player === 2) {
      if (player2Points === 0 || player2PointsHistory.length === 0) {
        return;
      }
      const pointsToRemove = player2PointsHistory[player2PointsHistory.length - 1];
      const newPoints = player2Points - pointsToRemove;
      setPlayer2Points(newPoints);
      setPlayer2PointsHistory(player2PointsHistory.slice(0, -1));
      if (player2TurnPoints >= pointsToRemove) {
        setPlayer2TurnPoints(player2TurnPoints - pointsToRemove);
      } else {
        setPlayer2TurnPoints(0);
      }
      console.log(`Player 2 points ${newPoints}`);
    }
  };

  const handleTapToClear = () => {
    setLastPointsAddedForPlayer(0);
  };

  useIOSShakeToUndo(handleShakeToUndo);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.view}>
        <View style={[styles.buttonRow, styles.buttonRowPlayer1]}>
          <AddButton
            player={1}
            pressFunction={() => addPointsToBoard({ player: 1, points: 1 })}
            longPressFunction={() => addPointsToBoard({ player: 1, points: 5 })}
          />
          <View style={[styles.uiButtonRow, styles.uiButtonRowPlayer1]}>
            <UIButton variation="clear" player={1} pressFunction={handleTapToClear} />
            <UIButton
              variation="undo"
              player={1}
              pressFunction={handleTapToUndo.bind(null, 1)}
              longPressFunction={resetGame}
            />
          </View>
        </View>
        {lastPointsAddedForPlayer === 1 && <TurnScore player={1} points={player1TurnPoints} />}
        <TotalScore player={1} playersPoints={player1Points} otherPlayersPoints={player2Points} />
        <CribbageBoard player1Points={player1Points} player2Points={player2Points} width={30} />
        <TotalScore player={2} playersPoints={player2Points} otherPlayersPoints={player1Points} />
        {lastPointsAddedForPlayer === 2 && <TurnScore player={2} points={player2TurnPoints} />}
        <View style={[styles.buttonRow, styles.buttonRowPlayer2]}>
          <AddButton
            player={2}
            pressFunction={() => addPointsToBoard({ player: 2, points: 1 })}
            longPressFunction={() => addPointsToBoard({ player: 2, points: 5 })}
          />
          <View style={styles.uiButtonRow}>
            <UIButton
              variation="undo"
              player={2}
              pressFunction={handleTapToUndo.bind(null, 2)}
              longPressFunction={resetGame}
            />
            <UIButton variation="clear" player={2} pressFunction={handleTapToClear} />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 32,
    paddingTop: 64,
    paddingHorizontal: 16,
    position: 'relative',
  },
  buttonRow: {
    flex: 1,
    gap: 8,
    width: '100%',
  },
  buttonRowPlayer1: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  buttonRowPlayer2: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  uiButtonRow: {
    flexDirection: 'row',
    gap: 16,
    padding: 8,
  },
  uiButtonRowPlayer1: {
    transform: [{ rotate: '180deg' }],
  },
});
