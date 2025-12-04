import { colors } from '@/constants/colors';
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
    left: 160,
    bottom: '75%',
    transform: [{ rotate: '180deg' }],
    color: colors.player.one,
  },
  viewPlayer2: {
    right: 160,
    top: '75%',
    color: colors.player.two,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  textPlayer1: {
    color: colors.player.one,
  },
  textPlayer2: {
    color: colors.player.two,
  },
  textGameOver: {
    fontWeight: 'normal',
    color: colors.surface.subtle,
  },
});
