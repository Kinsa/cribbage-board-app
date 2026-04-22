import { ThemeProvider } from '@/contexts/ThemeContext';
import UIButton from '../UIButton';

const ThemeDecorator = Story => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
);

export default {
  title: 'Components/UIButton',
  component: UIButton,
  decorators: [ThemeDecorator],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/VzH7RgiOq6Q2B3O73NJe36/Cribbage-Board?node-id=162-70&t=ZXezi1NLpoLeCkXR-4',
    },
  },
};

export const Undo = {
  args: {
    variation: 'undo',
    player: 1,
    pressFunction: () => {},
    longPressFunction: () => {},
  },
};

export const Clear = {
  args: {
    variation: 'clear',
    player: 1,
    pressFunction: () => {},
    longPressFunction: () => {},
  },
};
