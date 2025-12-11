import variables from '@kinsa/cribbage-board-app-tokens';
import { render } from '@testing-library/react-native';
import TurnPointsValue from '../TurnPointsValue';

describe('TurnPointsValue Component', () => {
  test('renders points', () => {
    const { getByTestId, getByText } = render(<TurnPointsValue player={1} points={7} />);

    // Check component renders
    expect(getByTestId(`turn-points-value-1`)).toBeOnTheScreen();

    // Check turn score text
    expect(getByText('7')).toBeOnTheScreen();
  });

  test.each([
    { player: 1, points: 5, expectedColor: { color: variables.light.text.player1.primary } },
    { player: 2, points: 42, expectedColor: { color: variables.light.text.player2.primary } },
  ])('player $player is styled correctly', ({ player, points, expectedColor }) => {
    const { getByTestId } = render(<TurnPointsValue player={player} points={points} />);
    const element = getByTestId(`turn-points-value-${player}`);
    expect(element.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(expectedColor)])
    );
  });
});

// snapshot tests
test.each([
  { player: 1, points: 5 },
  { player: 2, points: 42 },
])('renders correctly for player $player with $points points', ({ player, points }) => {
  const tree = render(<TurnPointsValue player={player} points={points} />).toJSON();
  expect(tree).toMatchSnapshot();
});
