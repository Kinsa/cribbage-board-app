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
npm test -- -u

# Update snapshots for specific file
npm test TurnScore.test.tsx -- -u

# Update snapshots interactively (review each one)
npm test -- -u --watch
```

## Design

[View the Figma file](https://www.figma.com/design/VzH7RgiOq6Q2B3O73NJe36/Cribbage-Board?node-id=19-57&m=dev)

The Figma file is publicly viewable, and the Full Comp page contains developer annotations, which are available in [Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode) (requires a paid seat to access).

### Design System

- **Variables**: Color palette defined in Figma variables
- **Components**: Reusable components with variants available in Figma library
- **Orientation**: Design splits the screen in half vertically so that it is right-side-up if the device is in portrait mode orientation between two people

### Implementation Status

- [x] High-Fidelity Comp: 
- [x] Component Library
- [x] State Variations
- [ ] Interactive Prototype

## Tech Stack

- React Native 0.79.6 with Expo
- TypeScript
- NativeWind (Tailwind CSS for React Native)
- Expo Router for navigation
- SVG graphics with react-native-svg
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/index) for testing

## Contributing

This project is licensed under the Apache License 2.0. By contributing, you agree that your contributions will be licensed under the same license. See [LICENSE](LICENSE) for details.

## License

Copyright 2025 Kinsa Creative Incorporated

Licensed under the Apache License, Version 2.0
