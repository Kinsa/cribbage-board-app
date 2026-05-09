import { useTheme } from '@/contexts/ThemeContext';
import variables from '@kinsa/cribbage-board-app-tokens';
import { StyleSheet, Text, useWindowDimensions } from 'react-native';

interface CurrentPointsValueProps {
  player: number;
  points: number;
}

function createStyles(colorScheme: 'light' | 'dark', positionX: number, positionY: string) {
  return StyleSheet.create({
    text: {
      position: 'absolute',
      fontWeight: 800,
      fontSize: 48,
    },
    textPlayer1: {
      color: variables[colorScheme].text.player1.primary,
      transform: [{ rotate: '180deg' }],
      left: positionX,
      bottom: positionY,
    },
    textPlayer2: {
      color: variables[colorScheme].text.player2.primary,
      right: positionX,
      top: positionY,
    },
  });
}

export default function CurrentPointsValue({ player, points }: CurrentPointsValueProps) {
  const { colorScheme } = useTheme();
  const windowDimensions = useWindowDimensions();

  let positionX = 32;
  let positionY = '65%';
  if (windowDimensions.width >= 500) {
    if (windowDimensions.width < windowDimensions.height) {
      // Portrait orientation on larger devices (like iPads)
      positionX = 100;
      positionY = '60%';
    } else {
      // Landscape orientation on larger devices
      positionX = 280;
    }
  }

  const styles = createStyles(colorScheme, positionX, positionY);

  return (
    <Text
      testID={`current-points-value-${player}`}
      style={[styles.text, player === 1 ? styles.textPlayer1 : styles.textPlayer2]}>
      {points}
    </Text>
  );
}
