import variables from '@kinsa/cribbage-board-app-tokens/build/es/variables.mjs';
import { useGameState } from '@/contexts/GameContext';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function WinnerScreen() {
  const router = useRouter();
  const { resetGame } = useGameState();
  const { winLanguagePrefix, winLanguageResult, player } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.view}>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            resetGame();
            router.push('/');
          }}
          style={styles.pressable}>
          <View style={styles.textWrapper}>
            <Text
              style={[styles.text, player === '1' ? styles.winnerPlayer1 : styles.winnerPlayer2]}>
              {winLanguagePrefix}
            </Text>
            <Text
              style={[
                styles.textEmphasis,
                player === '1' ? styles.winnerPlayer1Accent : styles.winnerPlayer2Accent,
              ]}>
              {winLanguageResult}!
            </Text>
          </View>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
  },
  pressable: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    backgroundColor: variables.light.surface.canvas,
    textAlign: 'left',
  },
  textWrapper: {
    paddingLeft: 40,
    paddingTop: 319,
  },
  text: {
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 24,
    marginBottom: 12,
  },
  textEmphasis: {
    fontWeight: 700,
    fontSize: 64,
    lineHeight: 64,
  },
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
