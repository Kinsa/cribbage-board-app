import UIButton from '@/components/UIButton';
import { useGameState } from '@/contexts/GameContext';
import { useTheme } from '@/contexts/ThemeContext';
import variables from '@kinsa/cribbage-board-app-tokens';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const WINNER_BACKGROUND_SVG = (colour1: string) => `
<svg width="440" height="956" viewBox="0 0 440 956" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M327.468 607.988C249.363 668.156 219.237 721.233 215.586 755.96C215.586 755.96 309.117 660.612 435.402 619.329C616.993 559.966 655.714 494.845 688.048 386.835C727.807 219.852 599.322 90.1511 445.299 65.7345C138.303 17.0694 103.439 264.165 103.439 264.165C105.468 263.439 107.454 262.773 109.438 262.115C135.85 205.926 205.486 100.731 351.795 118.109C517.245 137.764 661.946 350.328 327.468 607.988Z" fill="${colour1}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M315.686 186.058C417.62 209.583 447.106 290.313 381.16 415.55C315.213 540.786 86.5046 665.421 171.165 843.897C161.166 871.16 177.402 945.135 139.002 903.007C100.601 860.878 10.2637 682.94 122.979 531.535C235.694 380.13 271.626 240.574 145.366 250.244C145.366 250.244 216.269 163.114 315.686 186.058Z" fill="${colour1}"/>
<path d="M445.487 956H18.4407C196.053 928.824 365.901 935.618 445.487 944.483V956Z" fill="${colour1}"/>
</svg>`;

function createStyles(colorScheme: 'light' | 'dark') {
  return StyleSheet.create({
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
      backgroundColor: variables[colorScheme].surface.canvas,
      textAlign: 'left',
    },
    backgroundSvg: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 0,
    },
    textWrapper: {
      paddingLeft: 40,
      paddingTop: 319,
      alignItems: 'flex-start',
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
      marginBottom: 24,
    },
    winnerPlayer1: {
      color: variables[colorScheme].text.player1.highContrast,
    },
    winnerPlayer1Accent: {
      color: variables[colorScheme].text.player1.primary,
    },
    winnerPlayer2: {
      color: variables[colorScheme].text.player2.highContrast,
    },
    winnerPlayer2Accent: {
      color: variables[colorScheme].text.player2.primary,
    },
  });
}

export default function WinnerScreen() {
  const { colorScheme } = useTheme();
  const styles = createStyles(colorScheme);

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
          <SvgXml
            xml={WINNER_BACKGROUND_SVG(variables[colorScheme].surface.primary)}
            width="100%"
            height="100%"
            style={styles.backgroundSvg}
          />

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
            <UIButton
              variation="newGame"
              pressFunction={() => {
                resetGame();
                router.push('/');
              }}
              player={player === '1' ? 1 : 2} // doesn't affect anything
            />
          </View>
        </Pressable>
      </View>
    </>
  );
}
