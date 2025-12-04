import variables from '@kinsa/cribbage-board-app-tokens';
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
      style={({ pressed }) => [
        styles.button,
        player === 1 ? styles.buttonPlayer1 : styles.buttonPlayer2,
        pressed && player === 1 ? styles.buttonPlayer1Pressed : null,
        pressed && player === 2 ? styles.buttonPlayer2Pressed : null,
      ]}
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
    backgroundColor: variables.light.surface.canvas,
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPlayer1: {
    backgroundColor: variables.light.button.player1.background,
    transform: [{ rotate: '180deg' }],
    alignSelf: 'flex-start',
  },
  buttonPlayer1Pressed: {
    backgroundColor: variables.light.button.player1.backgroundFocus,
  },
  buttonPlayer2: {
    backgroundColor: variables.light.button.player2.background,
    alignSelf: 'flex-end',
  },
  buttonPlayer2Pressed: {
    backgroundColor: variables.light.button.player2.backgroundFocus,
  },
  text: {
    fontSize: 72,
    textAlign: 'center',
    marginTop: -10,
    marginRight: -2,
  },
  textPlayer1: {
    color: variables.light.button.player1.text,
  },
  textPlayer2: {
    color: variables.light.button.player2.text,
  },
});
