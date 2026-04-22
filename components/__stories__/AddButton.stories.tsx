import { ThemeProvider } from '@/contexts/ThemeContext';
import AddButton from '../AddButton';

const ThemeDecorator = Story => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
);

export default {
  title: 'Components/AddButton',
  component: AddButton,
  decorators: [ThemeDecorator],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/VzH7RgiOq6Q2B3O73NJe36/Cribbage-Board?node-id=162-69&t=ovXQPxzC9JrHtC2k-4',
    },
  },
};

export const Player1 = {
  args: {
    player: 1,
    pressFunction: () => {},
    longPressFunction: () => {},
  },
};

export const Player2 = {
  args: {
    player: 2,
    pressFunction: () => {},
    longPressFunction: () => {},
  },
};
