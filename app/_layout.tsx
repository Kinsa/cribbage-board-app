import { Stack } from 'expo-router';
import { GameProvider } from '@/contexts/GameContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <GameProvider>
        <Stack />
      </GameProvider>
    </ThemeProvider>
  );
}
