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

# Install dependencies
npm install

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
mise run test -- -u

# Update snapshots for specific file
mise run test TurnScore.test.tsx -- -u

# Update snapshots interactively (review each one)
mise run test -- -u --watch

# Run Storybook
mise run storybook
```

## Design

[View the Figma file](https://www.figma.com/design/VzH7RgiOq6Q2B3O73NJe36/Cribbage-Board?node-id=19-57&m=dev). 

### Figma Variables

Figma variables are manually kept in sync with the [Design Tokens repo](https://github.com/Kinsa/cribbage-board-app-tokens).

- **Variable Collections**: 
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
- [-] Update this project to use the [tokens project](https://github.com/Kinsa/cribbage-board-app-tokens) (possibly moving away from Tailwind) and fixing application of styles in so-doing
    - [ ] Document back-porting changes from the tokens project into Figma
- [-] Implement [Storybook](https://storybook.js.org/tutorials/intro-to-storybook/react-native/en/simple-component/) for existing components and use for addition of any further components, updating the documentation here
    - [x] Add Button
    - [ ] Current points value
    - [ ] Total points value
        - [ ] Implement Skunk Indicator variants
- [ ] Develop the Icon
- [ ] Develop the Clear and Undo buttons
- [ ] Develop the Win screen variations
- [ ] Develop new game dialog using an [alert](https://reactnative.dev/docs/alert)

### Phase 2

- [ ] Develop night mode
- [ ] EXPLORE: does the Win screen need a new game button?
- [ ] EXPLORE: On the win screen, should the tail wag?
- [ ] EXPLORE: On the win screen, if it is a skunk or double skunk should their be a poot cloud or double poot cloud behind the tail?

## Tech Stack

- React Native 0.79.6 with Expo
- TypeScript
- Expo Router for navigation
- SVG graphics with react-native-svg
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/index) for testing
- [Storybook.js](https://storybook.js.org/) testing and documenting components

## Contributing

This project is licensed under the Apache License 2.0. By contributing, you agree that your contributions will be licensed under the same license. See [LICENSE](LICENSE) for details.

### Components

Components may have unit tests and should have stories. 

Stories live in `components/__stories__/` with one story file per component using the naming scheme `ComponentName.stories.tsx`. _This location is configured in `.storybook/main.ts`._

Unit tests live in `components/__tests__/` with one test file per component using the naming scheme `ComponentName.test.tsx`.

## License

Copyright 2025 Kinsa Creative Incorporated

Licensed under the [Apache License, Version 2.0](LICENSE).
