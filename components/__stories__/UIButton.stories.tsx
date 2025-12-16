import UIButton from '../UIButton';

export default {
  title: 'Components/UIButton',
  component: UIButton,
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
