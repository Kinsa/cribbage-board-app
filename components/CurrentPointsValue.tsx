import variables from '@kinsa/cribbage-board-app-tokens';
import { StyleSheet, Text } from 'react-native';

interface CurrentPointsValueProps {
  player: number;
  points: number;
}

export default function CurrentPointsValue({ player, points }: CurrentPointsValueProps) {
  return (
    <Text
      testID={`current-points-value-${player}`}
      style={[styles.text, player === 1 ? styles.textPlayer1 : styles.textPlayer2]}>
      {points}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    fontWeight: 800,
    fontSize: 48,
  },
  textPlayer1: {
    color: variables.light.text.player1.primary,
    transform: [{ rotate: '180deg' }],
    left: 32,
    bottom: '65%',
  },
  textPlayer2: {
    color: variables.light.text.player2.primary,
    right: 32,
    top: '65%',
  },
});
