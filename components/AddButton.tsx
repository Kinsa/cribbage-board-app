import { colors } from '@/constants/colors';
import { Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps {
  player: number;
  pressFunction: () => void;
  longPressFunction: () => void;
}

export default function AddButton({ player, pressFunction, longPressFunction }: ButtonProps) {
  return (
    <Pressable
      testID={`add-button-${player}`}
      accessibilityRole="button"
      style={[styles.button, player === 1 ? styles.buttonPlayer1 : styles.buttonPlayer2]}
      onPress={() => {
        pressFunction();
      }}
      onLongPress={() => {
        longPressFunction();
      }}>
      <Text style={[styles.text, player === 1 ? styles.textPlayer1 : styles.textPlayer2]}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.surface.lowContrast,
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPlayer1: {
    transform: [{ rotate: '180deg' }],
    alignSelf: 'flex-start',
  },
  buttonPlayer2: {
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textPlayer1: {
    color: colors.player.one,
  },
  textPlayer2: {
    color: colors.player.two,
  },
});
