import AddButton from '@/components/AddButton';
import CribbageBoard from '@/components/CribbageBoard';
import TurnScore from '@/components/CurrentPointsValue';
import TotalScore from '@/components/TotalPointsValue';
import UIButton from '@/components/UIButton';
import { GAME_CONFIG } from '@/constants/gameConfig';
import { useGameState } from '@/contexts/GameContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useIOSShakeToUndo } from '@/utils';
import variables from '@kinsa/cribbage-board-app-tokens';
import { Stack, useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

function createStyles(colorScheme: 'light' | 'dark') {
  return StyleSheet.create({
    view: {
      backgroundColor: variables[colorScheme].surface.canvas,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 32,
      paddingTop: 56,
      paddingHorizontal: 8,
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
}

export default function HomeScreen() {
  const { colorScheme } = useTheme();
  const styles = createStyles(colorScheme);

  const router = useRouter();

  const {
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
  } = useGameState();

  const checkIfWon = (player: number, newPoints: number) => {
    if (newPoints >= GAME_CONFIG.WINNING_SCORE) {
      const otherPlayerPoints = player === 1 ? player2Points : player1Points;

      if (otherPlayerPoints <= GAME_CONFIG.DOUBLE_SKUNK_THRESHOLD) {
        router.push({
          pathname: '/winner',
          params: { winLanguagePrefix: 'Double', winLanguageResult: 'Skunk', player: player },
        });
      } else if (
        otherPlayerPoints <=
        GAME_CONFIG.SKUNK_THRESHOLD + GAME_CONFIG.DOUBLE_SKUNK_THRESHOLD
      ) {
        router.push({
          pathname: '/winner',
          params: { winLanguagePrefix: "That's a", winLanguageResult: 'Skunk', player: player },
        });
      } else {
        router.push({
          pathname: '/winner',
          params: { winLanguagePrefix: "That's a", winLanguageResult: 'Win', player: player },
        });
      }
    }
  };

  interface AddPointsToBoardProps {
    player: number;
    points: number;
  }

  const addPointsToBoard = ({ player, points }: AddPointsToBoardProps) => {
    // console.log(`Player ${player} added ${points} points`);

    if (player === 1) {
      if (lastPointsAddedForPlayer === 1) {
        const newPoints = player1TurnPoints + points;
        setPlayer1TurnPoints(newPoints);
        // console.log(`Player 1 turn points ${newPoints}`);
      } else {
        setPlayer1TurnPoints(points);
        // console.log(`Player 1 turn points ${points}`);
      }

      const newPoints = player1Points + points;
      setPlayer1Points(newPoints);
      setLastPointsAdded(points);
      setLastPointsAddedForPlayer(1);
      setPlayer1PointsHistory([...player1PointsHistory, points]);
      // console.log(`Player 1 points ${newPoints}`);
      checkIfWon(player, newPoints);
    }

    if (player === 2) {
      if (lastPointsAddedForPlayer === 2) {
        const newPoints = player2TurnPoints + points;
        setPlayer2TurnPoints(newPoints);
        // console.log(`Player 2 turn points ${newPoints}`);
      } else {
        setPlayer2TurnPoints(points);
        // console.log(`Player 2 turn points ${points}`);
      }

      const newPoints = player2Points + points;
      setPlayer2Points(newPoints);
      setLastPointsAdded(points);
      setLastPointsAddedForPlayer(2);
      setPlayer2PointsHistory([...player2PointsHistory, points]);
      // console.log(`Player 2 points ${newPoints}`);
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
      // console.log(`Player 1 points ${newPoints}`);
    } else if (lastPointsAddedForPlayer === 2) {
      const newPoints = player2Points - lastPointsAdded;
      setPlayer2Points(newPoints);
      setLastPointsAdded(newPoints);
      setLastPointsAddedForPlayer(0);
      setPlayer2PointsHistory(player2PointsHistory.slice(0, -1));
      // console.log(`Player 2 points ${newPoints}`);
    }
  };

  const handleTapToUndo = (player: number) => {
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
      // console.log(`Player 1 points ${newPoints}`);
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
      // console.log(`Player 2 points ${newPoints}`);
    }
  };

  const handleTapToReset = () => {
    Alert.alert(
      'Reset',
      'Reset and start a new game?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: () => resetGame(),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
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
            <UIButton
              variation="undo"
              player={1}
              pressFunction={handleTapToUndo.bind(null, 1)}
              longPressFunction={handleTapToReset}
            />
            <UIButton variation="clear" player={1} pressFunction={handleTapToClear} />
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
              longPressFunction={handleTapToReset}
            />
            <UIButton variation="clear" player={2} pressFunction={handleTapToClear} />
          </View>
        </View>
      </View>
    </>
  );
}
