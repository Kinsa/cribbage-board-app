import { ThemeProvider } from '@/contexts/ThemeContext';
import TotalPointsValue from '../TotalPointsValue';

const ThemeDecorator = Story => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
);

export default {
  title: 'Components/TotalPointsValue',
  component: TotalPointsValue,
  decorators: [ThemeDecorator],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/VzH7RgiOq6Q2B3O73NJe36/Cribbage-Board?node-id=162-72&t=ovXQPxzC9JrHtC2k-4',
    },
  },
};

export const Player1 = {
  args: {
    player: 1,
    playersPoints: 42,
    otherPlayersPoints: 0,
  },
};

export const Player2 = {
  args: {
    player: 2,
    playersPoints: 84,
    otherPlayersPoints: 0,
  },
};
