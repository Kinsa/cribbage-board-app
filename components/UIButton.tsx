import { useTheme } from '@/contexts/ThemeContext';
import variables from '@kinsa/cribbage-board-app-tokens';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const UNDO_ICON = `<svg width="16" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
<path d="M7.96875 1.25C12.25 1.25 15.75 4.75 15.75 9.03125C15.7188 13.2812 12.25 16.75 8 16.75C6 16.75 4.15625 16 2.78125 14.7812C2.625 14.625 2.625 14.375 2.78125 14.2188L4.03125 12.9688C4.15625 12.8438 4.375 12.8438 4.53125 12.9688C5.5 13.8125 6.6875 14.25 8 14.25C10.9062 14.25 13.2188 11.9062 13.2188 9.0625C13.25 6.0625 10.8125 3.75 7.9375 3.78125C6.625 3.78125 5.375 4.28125 4.40625 5.1875L5.71875 6.5C6.1875 6.96875 5.84375 7.75 5.1875 7.75H1C0.5625 7.75 0.25 7.4375 0.25 7V2.8125C0.25 2.15625 1.03125 1.8125 1.5 2.28125L2.625 3.40625C4.03125 2.09375 5.90625 1.28125 7.96875 1.25Z" fill="currentColor"/>
</svg>`;

const CLEAR_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<path d="M13.2583 4.88347H14.2305C14.6504 4.90556 14.9818 5.23702 14.9818 5.63477V14.2526C14.9818 14.6504 14.6504 14.9818 14.2526 14.9818H5.63477C5.23702 14.9818 4.90557 14.6504 4.88347 14.2305V13.2583C4.90557 12.8384 5.23702 12.507 5.67896 12.507L10.8497 12.6395L4.50782 6.29768C4.19846 5.98832 4.22056 5.52428 4.50782 5.23702L5.21492 4.52991C5.52428 4.22055 5.96623 4.22055 6.27558 4.52991L12.6174 10.8718L12.4849 5.65686C12.507 5.23702 12.8163 4.88347 13.2583 4.88347Z" fill="currentColor"/>
</svg>`;

const NEW_GAME_ICON = `<svg width="16" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
<path d="M8.81592 14.8872L8.12842 15.5747C7.81592 15.856 7.34717 15.856 7.06592 15.5747L0.972168 9.48098C0.690918 9.19973 0.690918 8.73098 0.972168 8.44973L7.06592 2.35598C7.34717 2.07473 7.81592 2.07473 8.12842 2.35598L8.81592 3.04348C9.09717 3.35598 9.09717 3.82473 8.78467 4.13723L5.03467 7.69973H14.0034C14.4409 7.69973 14.7534 8.04348 14.7534 8.44973V9.44973C14.7534 9.88723 14.4409 10.1997 14.0034 10.1997L5.03467 10.1997L8.81592 13.7935C9.09717 14.106 9.12842 14.5747 8.81592 14.8872Z" fill="currentColor"/>
</svg>`;

const BUTTON_ATTRIBUTES = {
  undo: { label: 'Undo', icon: UNDO_ICON },
  clear: { label: 'Reset Count', icon: CLEAR_ICON },
  newGame: { label: 'New', icon: NEW_GAME_ICON },
};

interface ButtonProps {
  variation: 'undo' | 'clear' | 'newGame';
  pressFunction: () => void;
  longPressFunction?: () => void;
  player: 1 | 2;
}

function createStyles(colorScheme: 'light' | 'dark') {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      gap: 4,
      flexDirection: 'column',
      fontSize: 12,
    },
    label: {
      color: variables[colorScheme].text.primary,
      paddingBottom: 5,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: variables[colorScheme].surface.invertedPrimary,
      borderColor: variables[colorScheme].surface.primary,
      borderRadius: '100%',
      color: variables[colorScheme].text.primary,
      borderWidth: 3,
    },
    iconContainerPressed: {
      backgroundColor: variables[colorScheme].surface.primary,
      color: variables[colorScheme].text.invertedPrimary,
    },
  });
}

export default function UIButton({
  variation,
  pressFunction,
  longPressFunction,
  player,
}: ButtonProps) {
  const { colorScheme } = useTheme();
  const styles = createStyles(colorScheme);
  const buttonAttributes = BUTTON_ATTRIBUTES[variation];

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
          ? variables[colorScheme].text.invertedPrimary
          : variables[colorScheme].text.primary;

        return (
          <>
            <Text style={styles.label}>{buttonAttributes.label}</Text>
            <View style={[styles.iconContainer, pressed && styles.iconContainerPressed]}>
              <SvgXml
                xml={buttonAttributes.icon}
                width={20}
                height={20}
                color={iconColor}
                testID={`ui-button-${variation}-${player}-icon`}
              />
            </View>
          </>
        );
      }}
    </Pressable>
  );
}
