import { ThemeProvider } from '@/contexts/ThemeContext';
import CurrentPointsValue from '../CurrentPointsValue';

const ThemeDecorator = Story => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
);

export default {
  title: 'Components/CurrentPointsValue',
  component: CurrentPointsValue,
  decorators: [ThemeDecorator],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/VzH7RgiOq6Q2B3O73NJe36/Cribbage-Board?node-id=162-71&t=ovXQPxzC9JrHtC2k-4',
    },
  },
};

export const Player1 = {
  args: {
    player: 1,
    points: 42,
  },
};

export const Player2 = {
  args: {
    player: 2,
    points: 84,
  },
};
