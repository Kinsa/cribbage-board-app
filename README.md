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
mise run format

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
npx eas-cli@latest build --platform ios

# Submit the build using EAS
npx eas-cli@latest submit --platform ios
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
  - [ ] Update tests to include Game Context, routing, and win screen player styling 
  - [x] Style the Win screen
- [x] Update the UI button text style to match change in Figma (12pt font above button)
- [x] Update the Clear button to say "Reset Count"
- [x] Develop new game dialog using an [alert](https://reactnative.dev/docs/alert) when the Undo button is long pressed
- [x] Develop night mode; use cmd + shift + a to shift the simulator between light and dark mode
- [ ] Update the image and the copyright on the marketing site at https://apps.kinsacreative.com
- [ ] Address this warning: This app was built with the iOS 18.5 SDK. Starting April 28, 2026, all iOS and iPadOS apps must be built with the iOS 26 SDK or later, included in Xcode 26 or later, in order to be uploaded to App Store Connect or submitted for distribution.
    - [x] Update to Expo 54
        - [ ] [Add a .icon file](https://expo.dev/changelog/sdk-54) built with Icon composer with proper light and dark versions

        `app.json`:

        ```javascript
        {
            "ios": {
                "icon": "./assets/app.icon"
            }
        }
        ```

            - [Tutorial](https://developer.apple.com/videos/play/wwdc2025/361/)
    - [ ] Update to [Expo 55](https://expo.dev/changelog/sdk-55)

### Phase 2

#### Better iPad support

- [ ] Can the design be scaled to better fill the space for iPad?

#### Android support

- [ ] Add Android support

### Exploration

- [x] Does the Win screen need a new game button?
- [ ] On the win screen, could the tail wag?
- [ ] On the win screen, if it is a skunk or double skunk could their be a poot cloud or double poot cloud behind the tail?

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
