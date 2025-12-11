import AddButton from '../AddButton';

export default {
  title: 'Components/AddButton',
  component: AddButton,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/VzH7RgiOq6Q2B3O73NJe36/Cribbage-Board?node-id=1-40&t=ovXQPxzC9JrHtC2k-4',
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
