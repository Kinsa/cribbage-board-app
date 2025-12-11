import variables from '@kinsa/cribbage-board-app-tokens';
import { render, screen } from '@testing-library/react-native';
import TotalPointsValue from '../TotalPointsValue';

describe('TotalPointsValue Component', () => {
  test('renders points and maximum score', () => {
    const { getByTestId, getByText } = render(
      <TotalPointsValue player={1} playersPoints={7} otherPlayersPoints={0} />
    );

    // Check component renders
    expect(getByTestId(`total-points-value-1`)).toBeOnTheScreen();

    // Check maximum score text
    expect(getByText('7 / 121')).toBeOnTheScreen();
  });

  test.each([
    {
      player: 1 as 1 | 2,
      points: 5,
      otherPlayersPoints: 0,
      expectedColor: { color: variables.light.text.player1.highContrast },
    },
    {
      player: 2 as 1 | 2,
      points: 42,
      otherPlayersPoints: 0,
      expectedColor: { color: variables.light.text.player2.highContrast },
    },
  ])(
    'player $player is styled correctly',
    ({ player, points, otherPlayersPoints, expectedColor }) => {
      const { getByTestId } = render(
        <TotalPointsValue
          player={player}
          playersPoints={points}
          otherPlayersPoints={otherPlayersPoints}
        />
      );
      const element = getByTestId(`total-points-value-${player}-text`);
      expect(element.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedColor)])
      );

      const text = screen.getByText(`${points} / 121`);
      expect(text).toBeOnTheScreen();
    }
  );

  describe('Skunk Icon Rendering', () => {
    test('does not render skunk icon when point difference is less than 30', () => {
      const { queryByTestId } = render(
        <TotalPointsValue player={1} playersPoints={50} otherPlayersPoints={25} />
      );

      expect(queryByTestId('skunk-icon-player-1')).not.toBeOnTheScreen();
      expect(queryByTestId('skunk-icon-player-2')).not.toBeOnTheScreen();
    });

    test('does not render skunk icon when point difference is exactly 29', () => {
      const { queryByTestId } = render(
        <TotalPointsValue player={1} playersPoints={50} otherPlayersPoints={21} />
      );

      expect(queryByTestId('skunk-icon-player-1')).not.toBeOnTheScreen();
      expect(queryByTestId('skunk-icon-player-2')).not.toBeOnTheScreen();
    });

    test('renders 1 skunk icon for player 1 when they are ahead by exactly 30 points', () => {
      const { queryAllByTestId } = render(
        <TotalPointsValue player={1} playersPoints={50} otherPlayersPoints={20} />
      );

      const skunkIcons = queryAllByTestId('skunk-icon-player-1');
      expect(skunkIcons).toHaveLength(1);
    });

    test('renders 1 skunk icon for player 2 when they are ahead by 30-59 points', () => {
      const { queryAllByTestId } = render(
        <TotalPointsValue player={2} playersPoints={80} otherPlayersPoints={40} />
      );

      const skunkIcons = queryAllByTestId('skunk-icon-player-2');
      expect(skunkIcons).toHaveLength(1);
    });

    test('renders 1 skunk icon for player 1 when they are ahead by 59 points', () => {
      const { queryAllByTestId } = render(
        <TotalPointsValue player={1} playersPoints={100} otherPlayersPoints={41} />
      );

      const skunkIcons = queryAllByTestId('skunk-icon-player-1');
      expect(skunkIcons).toHaveLength(1);
    });

    test('renders 2 skunk icons for player 1 when they are ahead by exactly 60 points', () => {
      const { queryAllByTestId } = render(
        <TotalPointsValue player={1} playersPoints={90} otherPlayersPoints={30} />
      );

      const skunkIcons = queryAllByTestId('skunk-icon-player-1');
      expect(skunkIcons).toHaveLength(2);
    });

    test('renders 2 skunk icons for player 2 when they are ahead by more than 60 points', () => {
      const { queryAllByTestId } = render(
        <TotalPointsValue player={2} playersPoints={100} otherPlayersPoints={20} />
      );

      const skunkIcons = queryAllByTestId('skunk-icon-player-2');
      expect(skunkIcons).toHaveLength(2);
    });

    test('renders 1 skunk icon for player 2 when player 1 is behind by 30-59 points', () => {
      const { queryAllByTestId } = render(
        <TotalPointsValue player={1} playersPoints={20} otherPlayersPoints={50} />
      );

      const skunkIcons = queryAllByTestId('skunk-icon-player-2');
      expect(skunkIcons).toHaveLength(1);
    });

    test('renders 2 skunk icons for player 1 when player 2 is behind by 60+ points', () => {
      const { queryAllByTestId } = render(
        <TotalPointsValue player={2} playersPoints={30} otherPlayersPoints={100} />
      );

      const skunkIcons = queryAllByTestId('skunk-icon-player-1');
      expect(skunkIcons).toHaveLength(2);
    });
  });
});

// snapshot tests
test.each([
  { player: 1 as 1 | 2, points: 5, otherPlayersPoints: 0 },
  { player: 2 as 1 | 2, points: 42, otherPlayersPoints: 0 },
])(
  'renders correctly for player $player with $points points',
  ({ player, points, otherPlayersPoints }) => {
    const tree = render(
      <TotalPointsValue
        player={player}
        playersPoints={points}
        otherPlayersPoints={otherPlayersPoints}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  }
);
