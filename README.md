# Cribbage Board App

A React Native cribbage scoring application built with Expo.

## Prerequisites

- [mise](https://mise.jdx.dev/) - Development environment manager
- [Node.js](https://nodejs.org/) 22.17.0 (managed by mise)
- Xcode (for iOS development)
- Physical iPhone with USB connection for testing

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd CribbageBoardApp

# Install mise-managed tools
mise install

# Install dependencies from lock file
npm ci

# Start development server which prompts with options to run in emulators etc.
mise run start

# Or, run on connected iPhone
mise run iphone
```

## Development

```bash
# Start development server
mise run start

# Run on iOS simulator
mise run ios

# Run on connected iPhone via USB
mise run iphone

# Run linting
npm run lint

# Format code
npm run format

# Update all snapshots
npm test -- -u

# Update snapshots for specific file
npm test TurnScore.test.tsx -- -u

# Update snapshots interactively (review each one)
npm test -- -u --watch

# Run Storybook
mise run storybook
```

## Distribution

```shell
# Create a build using EAS
mise run build-ios

# Submit the build using EAS
mise run distribute-ios
```

## Design

[View the Figma file](https://www.figma.com/design/VzH7RgiOq6Q2B3O73NJe36/Cribbage-Board?node-id=19-57&m=dev). 

### Figma Variables

Figma variables are manually kept in sync with the [Design Tokens repo](https://github.com/Kinsa/cribbage-board-app-tokens) via the [Figma Token Sync plugin](https://github.com/Kinsa/cribbage-board-app-token-sync-plugin).

#### Variable Collections

- **Primitives**: Primitive tokens which form the basis for the semantic tokens. These should never be used directly in a component.
- **Tokens**: Semantic tokens. Currently only comprising the color palette.
- **Game Interactions**: Variables used in the Game Interaction Prototype. These are not part of the Design Tokens repo.

### Figma Pages

- **Components**: Reusable components with variants available in Figma library.
- **App Icon**: Light and dark versions of the application icon.
- **High Fidelity Comps**: contain developer annotations (requires a paid seat to access).
    - **Cribbage Board**: The main app screen where game play happens. Design is split around the center axis so half of the screen is upright for each player. 
    - **Winner**: Winner announcement page. Indicates a win, skunk, or double skunk and by which player.
- **Game Interactions Prototype**: Prototypes the Add, Clear, and Undo button interactions relative to the Current Points Value and Total Points Value.

### Sampling of Viewport Sizes to Account For

#### Phone

- **iPhone 17** 402 x 874
- **iPhone 17 Pro Max** 430 x 932

#### Tablet

- **iPad Mini** 744 x 1133
- **iPad** 820 x 1180
- **iPad Air 11-inch** 820 x 1180
- **iPad Pro 11-inch** 834 x 1210
- **iPad Air 13-inch** 1024 x 1366
- **iPad Pro 13-inch** 1032 x 1376

## Implementation Status

- [x] High-Fidelity Comp
- [x] Component Library
- [x] State Variations
- [-] Interactive Prototype
    - [ ] If Player 1 presses the Add button, it should have the same effect as if Player 2 pressed the Clear button on their Current Points Value (can try using Figma Make to do this)
- [x] React Native Proof of Concept SVG Animation; tap to add, tap and hold to add 5, adding clears other player's Current Points Value
- [x] Update this project to use the [tokens project](https://github.com/Kinsa/cribbage-board-app-tokens) (possibly moving away from Tailwind) and fixing application of styles in so-doing
- [-] Implement [Storybook](https://storybook.js.org/tutorials/intro-to-storybook/react-native/en/simple-component/) for existing components and use for addition of any further components, updating the documentation here
    - [x] Add Button
        - [x] Link back to Figma using the `design` parameter:
            ```javascript
            parameters: {
                design: {
                    type: 'figma',
                    url: '<Get the link for the component/frame via Copy URL>',
                },
            },
            ```
    - [x] Current points value
        - [x] Functionality when pressed is MVP rather than as intended
    - [x] Total points value
        - [x] Implement Skunk Indicator variants
        - [x] Functionality when pressed is MVP rather than as intended
    - [ ] Color tokens using https://storybook.js.org/addons/storybook-design-token
- [x] Develop the Icon
- [-] Develop the Win screen variations
  - [ ] Update tests to include Game Context, routing, and win screen player styling and rotation
  - [x] Style the Win screen
- [x] Update the UI button text style to match change in Figma (12pt font above button)
- [x] Update the Clear button to say "Reset Count"
- [x] Develop new game dialog using an [alert](https://reactnative.dev/docs/alert) when the Undo button is long pressed
- [x] Develop night mode; use cmd + shift + a to shift the simulator between light and dark mode
- [x] Address this warning: This app was built with the iOS 18.5 SDK. Starting April 28, 2026, all iOS and iPadOS apps must be built with the iOS 26 SDK or later, included in Xcode 26 or later, in order to be uploaded to App Store Connect or submitted for distribution.
    - [x] Update to Expo 54
- [x] [Add a .icon file](https://expo.dev/changelog/sdk-54) built with Icon composer with proper light and dark versions

    `app.json`:

    ```javascript
    {
        "ios": {
            "icon": "./assets/app.icon"
        }
    }
    ```

    - [Tutorial](https://developer.apple.com/videos/play/wwdc2025/361/)
- [x] Replace the `assets/splash-icon.png`
- [x] Scale the design to better fit on iPad
    - [x] Test on all iPad models
    - [x] Revise position of components for 13" iPads
    - [x] Update automated tests to pass with changes
- [x] Update App Store listing with iPad screenshots in both orientations
- [x] At time of release, publish updated App Accessibility Draft
- [x] Update the image and the copyright on the marketing site at https://apps.kinsacreative.com

### Phase 2

- [ ] Update to [Expo 55](https://expo.dev/changelog/sdk-55)
    - may need to start with a blank project and copy in components?
- [ ] Review accessibility features: (these can be set in App Accessibility in App Store Connect)
    - Voice Over - Using Apple's VoiceOver screen reader, users can navigate an app's interface without needing to see the screen. Many people who are blind or have low vision use VoiceOver to understand and control apps.
    - Voice Control - Using Apple's Voice Control feature, users with reduced mobility or dexterity can navigate an app's interface using only their voice. When looking at the screen, they can use commands like "tap", "click", or "swipe" to interact with on-screen elements.
    - Larger Text - Users can adjust the size of text and icons to make them more legible, visible, and comfortable to read.
        - [ ] Fix: score values increase but get clipped; button labels stay the same size

#### Android support

- [ ] Add Android support

### Exploration

- [x] Does the Win screen need a new game button?
- [ ] On the win screen, could the tail wag?
- [ ] On the win screen, if it is a skunk or double skunk could their be a poot cloud or double poot cloud behind the tail?
- [ ] Win tracking
    - UI idea: dot in winning colour indicate a win, after a second win add a number indicating the total e.g. •2, tap the area to access an overview screen and reset the count. Retain in perpetuity (or until reset).
        - Upsell: Save account, name account, name opponents and switch between them
            - Colour picker
- [ ] Grid based layout? (starts to fall apart as it scales for iPads)
- [ ] Lay out total scores with both player points -- you in bold, other in normal text, separated by a pipe, over 121

## Tech Stack

- React Native with Expo
- TypeScript
- Expo Router for navigation
- SVG graphics with react-native-svg
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/index) for testing
- [Storybook.js](https://storybook.js.org/) testing and documenting components

## Deployment and Distribution

- Download the distribution provisioning profile from App Store Connect.
- Create a build and then upload it using the eas-cli commands. Reference the provisioning profile downloaded in step 1 when it asks.
- Use iPhone 17 Pro Max as the simulator to take screenshots on and upload to the 6.9" display. Apple will resize to the required 6.5" display size.

## Contributing

This project is licensed under the Apache License 2.0. By contributing, you agree that your contributions will be licensed under the same license. See [LICENSE](LICENSE) for details.

### Components

Components may have unit tests and should have stories. 

Stories live in `components/__stories__/` with one story file per component using the naming scheme `ComponentName.stories.tsx`. _This location is configured in `.storybook/main.ts`._

Unit tests live in `components/__tests__/` with one test file per component using the naming scheme `ComponentName.test.tsx`.

## License

Copyright 2026 Kinsa Creative Incorporated

Licensed under the [Apache License, Version 2.0](LICENSE).
