import variables from '@kinsa/cribbage-board-app-tokens';
import { StyleSheet, Text, View } from 'react-native';

interface TotalScoreProps {
  player: number;
  points: number;
}

export default function TotalScore({ player, points }: TotalScoreProps) {
  return (
    <View
      testID={`total-score-${player}`}
      style={[styles.view, player === 1 ? styles.viewPlayer1 : styles.viewPlayer2]}>
      <Text
        testID={`total-score-${player}-text`}
        style={[styles.text, player === 1 ? styles.textPlayer1 : styles.textPlayer2]}>
        {points}
      </Text>
      <Text style={[styles.text, styles.textGameOver]}> / 121</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-end',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewPlayer1: {
    right: 224,
    bottom: '75%',
    transform: [{ rotate: '180deg' }],
  },
  viewPlayer2: {
    left: 224,
    top: '75%',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  textPlayer1: {
    color: variables.light.text.player1.highContrast,
  },
  textPlayer2: {
    color: variables.light.text.player2.highContrast,
  },
  textGameOver: {
    fontWeight: 'normal',
    color: variables.light.text.secondary,
  },
});
