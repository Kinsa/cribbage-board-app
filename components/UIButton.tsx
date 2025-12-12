import variables from '@kinsa/cribbage-board-app-tokens';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const UNDO_ICON = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.96875 1.25C12.25 1.25 15.75 4.75 15.75 9.03125C15.7188 13.2812 12.25 16.75 8 16.75C6 16.75 4.15625 16 2.78125 14.7812C2.625 14.625 2.625 14.375 2.78125 14.2188L4.03125 12.9688C4.15625 12.8438 4.375 12.8438 4.53125 12.9688C5.5 13.8125 6.6875 14.25 8 14.25C10.9062 14.25 13.2188 11.9062 13.2188 9.0625C13.25 6.0625 10.8125 3.75 7.9375 3.78125C6.625 3.78125 5.375 4.28125 4.40625 5.1875L5.71875 6.5C6.1875 6.96875 5.84375 7.75 5.1875 7.75H1C0.5625 7.75 0.25 7.4375 0.25 7V2.8125C0.25 2.15625 1.03125 1.8125 1.5 2.28125L2.625 3.40625C4.03125 2.09375 5.90625 1.28125 7.96875 1.25Z" fill="currentColor"/>
</svg>`;

const CLEAR_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.2583 4.88347H14.2305C14.6504 4.90556 14.9818 5.23702 14.9818 5.63477V14.2526C14.9818 14.6504 14.6504 14.9818 14.2526 14.9818H5.63477C5.23702 14.9818 4.90557 14.6504 4.88347 14.2305V13.2583C4.90557 12.8384 5.23702 12.507 5.67896 12.507L10.8497 12.6395L4.50782 6.29768C4.19846 5.98832 4.22056 5.52428 4.50782 5.23702L5.21492 4.52991C5.52428 4.22055 5.96623 4.22055 6.27558 4.52991L12.6174 10.8718L12.4849 5.65686C12.507 5.23702 12.8163 4.88347 13.2583 4.88347Z" fill="currentColor"/>
</svg>`;

interface ButtonProps {
  variation: 'undo' | 'clear';
  pressFunction: () => void;
  longPressFunction?: () => void;
  player: 1 | 2;
}

export default function UIButton({
  variation,
  pressFunction,
  longPressFunction,
  player,
}: ButtonProps) {
  const buttonAttributes = {
    undo: { label: 'Undo', icon: UNDO_ICON },
    clear: { label: 'Clear', icon: CLEAR_ICON },
  };

  return (
    <Pressable
      testID={`ui-button-${variation}-${player}`}
      accessibilityRole="button"
      style={styles.button}
      onPress={() => {
        pressFunction();
      }}
      onLongPress={() => {
        if (longPressFunction) {
          longPressFunction();
        }
      }}>
      {({ pressed }) => {
        const iconColor = pressed
          ? variables.light.text.invertedPrimary
          : variables.light.text.primary;

        return (
          <>
            <View style={[styles.iconContainer, pressed && styles.iconContainerPressed]}>
              <SvgXml
                xml={buttonAttributes[variation].icon}
                width={20}
                height={20}
                color={iconColor}
                testID={`ui-button-${variation}-${player}-icon`}
              />
            </View>
            <Text>{buttonAttributes[variation].label}</Text>
          </>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    gap: 4,
    flexDirection: 'column',
    fontSize: 12,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: variables.light.surface.invertedPrimary,
    borderColor: variables.light.surface.primary,
    borderRadius: '100%',
    color: variables.light.text.primary,
    borderWidth: 3,
  },
  iconContainerPressed: {
    backgroundColor: variables.light.surface.primary,
    color: variables.light.text.invertedPrimary,
  },
});
