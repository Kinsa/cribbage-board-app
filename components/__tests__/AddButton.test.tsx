import { colors } from '@/constants/colors';
import { fireEvent, render, screen } from '@testing-library/react-native';
import AddButton from '../AddButton';

describe('AddButton Component', () => {
  test.each([
    { player: 1, expectedColor: { color: colors.player.one } },
    { player: 2, expectedColor: { color: colors.player.two } },
  ])(
    'player $player contains addition symbol with correct styling',
    ({ player, expectedColor }) => {
      const mockPress = jest.fn();
      const mockLongPress = jest.fn();

      render(
        <AddButton player={player} pressFunction={mockPress} longPressFunction={mockLongPress} />
      );

      // Check button exists
      const button = screen.getByRole('button');
      expect(button).toBeOnTheScreen();

      // Check the text inside the button
      const plusText = screen.getByText('+');
      expect(plusText).toBeOnTheScreen();
      expect(plusText.props.style).toEqual(expect.arrayContaining([expectedColor]));

      // Check the press interaction
      fireEvent.press(button);
      expect(mockPress).toHaveBeenCalledTimes(1);

      // Check the long press interaction
      fireEvent(button, 'longPress');
      expect(mockLongPress).toHaveBeenCalledTimes(1);
    }
  );
});

// snapshot tests
test.each([1, 2])('renders correctly for player %i', player => {
  const tree = render(
    <AddButton player={player} pressFunction={() => {}} longPressFunction={() => {}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
