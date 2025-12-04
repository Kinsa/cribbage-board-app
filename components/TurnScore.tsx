import { colors } from '@/constants/colors';
import { StyleSheet, Text } from 'react-native';

interface TurnScoreProps {
  player: number;
  points: number;
}

export default function TurnScore({ player, points }: TurnScoreProps) {
  return (
    <Text
      testID={`turn-score-${player}`}
      style={[styles.text, player === 1 ? styles.textPlayer1 : styles.textPlayer2]}>
      {points}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 48,
  },
  textPlayer1: {
    color: colors.player.one,
    transform: [{ rotate: '180deg' }],
    left: 32,
    bottom: '65%',
  },
  textPlayer2: {
    color: colors.player.two,
    right: 32,
    top: '65%',
  },
});
