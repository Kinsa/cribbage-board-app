import variables from '@kinsa/cribbage-board-app-tokens';
import { StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const SKUNK_SVG = `<svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.82624 9.03196C3.67511 9.92578 3.23111 10.7143 3.17729 11.2302C3.17729 11.2302 4.55577 9.81371 6.41698 9.20043C9.09331 8.31857 9.66399 7.35117 10.1405 5.74663C10.7265 3.26601 8.83288 1.33924 6.56286 0.976518C2.03828 0.253574 1.52445 3.92431 1.52445 3.92431C1.55436 3.91352 1.58362 3.90363 1.61286 3.89384C2.00214 3.05913 3.02844 1.4964 5.18477 1.75457C7.62321 2.04655 9.75583 5.20429 4.82624 9.03196Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.65271 2.76402C6.15503 3.11349 6.5896 4.31277 5.61767 6.17322C4.64574 8.03368 1.27498 9.88519 2.52272 12.5365C2.37536 12.9415 2.61465 14.0405 2.0487 13.4146C1.48274 12.7888 0.151326 10.1454 1.81255 7.89624C3.47376 5.64704 4.00334 3.57387 2.14249 3.71753C2.14249 3.71753 3.18748 2.42316 4.65271 2.76402Z" fill="currentColor"/>
</svg>`;

interface SkunkIconProps {
  player: 1 | 2;
}

interface SkunkProps {
  player: 1 | 2;
  skunkLevel: 1 | 2;
}

interface TotalPointsValueProps {
  player: 1 | 2;
  playersPoints: number;
  otherPlayersPoints: number;
}

function SkunkIcon({ player }: SkunkIconProps) {
  const color =
    player === 1
      ? variables.light.text.player1.highContrast
      : variables.light.text.player2.highContrast;
  return (
    <SvgXml
      xml={SKUNK_SVG}
      width={11}
      height={14}
      color={color}
      testID={`skunk-icon-player-${player}`}
    />
  );
}

function SkunkOrDoubleSkunkIcon({ player, skunkLevel }: SkunkProps) {
  if (skunkLevel === 1) {
    return SkunkIcon({ player });
  } else if (skunkLevel === 2) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <SkunkIcon player={player} />
        <SkunkIcon player={player} />
      </View>
    );
  }
}

function SkunkLevel({
  player,
  playerPoints,
  otherPlayerPoints,
}: {
  player: 1 | 2;
  playerPoints: number;
  otherPlayerPoints: number;
}) {
  if (playerPoints - otherPlayerPoints >= 60) {
    return SkunkOrDoubleSkunkIcon({ player, skunkLevel: 2 });
  } else if (playerPoints - otherPlayerPoints >= 30) {
    return SkunkOrDoubleSkunkIcon({ player, skunkLevel: 1 });
  } else if (otherPlayerPoints - playerPoints >= 60) {
    return SkunkOrDoubleSkunkIcon({ player: (player === 1 ? 2 : 1) as 1 | 2, skunkLevel: 2 });
  } else if (otherPlayerPoints - playerPoints >= 30) {
    return SkunkOrDoubleSkunkIcon({ player: (player === 1 ? 2 : 1) as 1 | 2, skunkLevel: 1 });
  } else {
    return null;
  }
}

export default function TotalPointsValue({
  player,
  playersPoints,
  otherPlayersPoints,
}: TotalPointsValueProps) {
  return (
    <View
      testID={`total-points-value-${player}`}
      style={[styles.view, player === 1 ? styles.viewPlayer1 : styles.viewPlayer2]}>
      <Text
        testID={`total-points-value-${player}-text`}
        style={[styles.text, player === 1 ? styles.textPlayer1 : styles.textPlayer2]}>
        {playersPoints}
        <Text style={[styles.text, styles.textGameOver]}> / 121</Text>
      </Text>
      <SkunkLevel
        player={player}
        playerPoints={playersPoints}
        otherPlayerPoints={otherPlayersPoints}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    gap: 8,
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
