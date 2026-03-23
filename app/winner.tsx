import variables from '@kinsa/cribbage-board-app-tokens/build/es/variables.mjs';
import { useGameState } from '@/contexts/GameContext';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function WinnerScreen() {
  const router = useRouter();
  const { resetGame } = useGameState();
  const { winLanguage, player } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          resetGame();
          router.push('/');
        }}>
        <Text style={player === '1' ? styles.winnerPlayer1 : styles.winnerPlayer2}>
          That&rsquo;s a{' '}
          <Text style={player === '1' ? styles.winnerPlayer1Accent : styles.winnerPlayer2Accent}>
            {winLanguage}!
          </Text>
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  winnerPlayer1: {
    color: variables.light.text.player1.highContrast,
  },
  winnerPlayer1Accent: {
    color: variables.light.text.player1.primary,
  },
  winnerPlayer2: {
    color: variables.light.text.player2.highContrast,
  },
  winnerPlayer2Accent: {
    color: variables.light.text.player2.primary,
  },
});
