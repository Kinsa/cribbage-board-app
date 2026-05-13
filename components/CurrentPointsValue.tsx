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

  let positionX = 20;
  let positionY = '60%';

  if (windowDimensions.width >= 500) {
    if (windowDimensions.width < windowDimensions.height) {
      // Portrait orientation on larger devices (like iPads)
      positionX = 100;
      positionY = '60%';
    } else {
      // Landscape orientation on larger devices
      positionX = 100;
    }
  }

  if (windowDimensions.height > 1200 && windowDimensions.width > 800) {
    // 11-inch iPads in Portrait
    positionX = 230;
    positionY = '75%';
  }

  if (windowDimensions.height > 800 && windowDimensions.width > 1200) {
    // 11-inch iPads in Landscape
    positionX = 280;
    positionY = '78%';
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
