import { render, screen, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../index';

describe('HomeScreen Integration Tests', () => {
  beforeEach(() => {
    render(<HomeScreen />);
  });

  test('renders correctly', () => {
    const totalScore1 = screen.getByTestId('total-score-1');
    const totalScore1Text = screen.getByTestId('total-score-1-text');
    const totalScore2 = screen.getByTestId('total-score-2');
    const totalScore2Text = screen.getByTestId('total-score-2-text');
    const player1Button = screen.getByTestId('add-button-1');
    const player2Button = screen.getByTestId('add-button-2');

    // Both add buttons render
    expect(player1Button).toBeOnTheScreen();
    expect(player2Button).toBeOnTheScreen();

    // Both total scores render
    expect(totalScore1).toBeOnTheScreen();
    expect(totalScore1Text).toBeOnTheScreen();
    expect(totalScore1Text).toHaveTextContent('0');

    expect(totalScore2).toBeOnTheScreen();
    expect(totalScore2Text).toBeOnTheScreen();
    expect(totalScore2Text).toHaveTextContent('0');

    // Initially, turn score should not exist
    expect(screen.queryByTestId('turn-score-1')).not.toBeOnTheScreen();
    expect(screen.queryByTestId('turn-score-2')).not.toBeOnTheScreen();
  });

  test('clicking player 1 button updates total score and renders the turn score for that player', () => {
    const player1Button = screen.getByTestId('add-button-1');
    const totalScore1 = screen.getByTestId('total-score-1');
    const totalScore1Text = screen.getByTestId('total-score-1-text');
    const totalScore2 = screen.getByTestId('total-score-2');
    const totalScore2Text = screen.getByTestId('total-score-2-text');

    // Click to add 1 point
    fireEvent.press(player1Button);

    // Verify both total scores are still rendered after update
    expect(totalScore1).toBeOnTheScreen();
    expect(totalScore1Text).toBeOnTheScreen();
    expect(totalScore1Text).toHaveTextContent('1');

    // turn score appears after first click for player
    const turnScore1 = screen.getByTestId('turn-score-1');
    expect(turnScore1).toBeOnTheScreen();
    expect(turnScore1).toHaveTextContent('1');

    expect(totalScore2).toBeOnTheScreen();
    expect(totalScore2Text).toBeOnTheScreen();
    expect(totalScore2Text).toHaveTextContent('0');

    // turn score is not visible for second player
    expect(screen.queryByTestId('turn-score-2')).not.toBeOnTheScreen();
  });

  test('long press adds 5 points to total score and the turn score for that player', () => {
    const player1Button = screen.getByTestId('add-button-1');
    const totalScore1 = screen.getByTestId('total-score-1');
    const totalScore1Text = screen.getByTestId('total-score-1-text');
    const totalScore2 = screen.getByTestId('total-score-2');
    const totalScore2Text = screen.getByTestId('total-score-2-text');

    // Long press to add 5 points
    fireEvent(player1Button, 'longPress');

    // Verify both scores are still rendered after update
    expect(totalScore1).toBeOnTheScreen();
    expect(totalScore1Text).toBeOnTheScreen();
    expect(totalScore1Text).toHaveTextContent('5');

    const turnScore1 = screen.getByTestId('turn-score-1');
    expect(turnScore1).toBeOnTheScreen();
    expect(turnScore1).toHaveTextContent('5');

    expect(totalScore2).toBeOnTheScreen();
    expect(totalScore2Text).toBeOnTheScreen();
    expect(totalScore2Text).toHaveTextContent('0');

    expect(screen.queryByTestId('turn-score-2')).not.toBeOnTheScreen();
  });

  test('clicking different players switches turn score', () => {
    const player1Button = screen.getByTestId('add-button-1');
    const player2Button = screen.getByTestId('add-button-2');

    // Click player 1 - turn score appears
    fireEvent.press(player1Button);
    expect(screen.getByTestId('turn-score-1')).toBeOnTheScreen();

    // Click player 2 - turn score should still exist but for player 2
    fireEvent.press(player2Button);
    expect(screen.getByTestId('turn-score-2')).toBeOnTheScreen();
  });

  test('multiple clicks by same player accumulate turn points', () => {
    const player1Button = screen.getByTestId('add-button-1');

    // Click multiple times
    fireEvent.press(player1Button);
    fireEvent.press(player1Button);
    fireEvent.press(player1Button);

    // Turn score should still be visible after multiple clicks
    const turnScore1 = screen.getByTestId('turn-score-1');
    expect(turnScore1).toBeOnTheScreen();
    expect(turnScore1).toHaveTextContent('3');
  });
});
