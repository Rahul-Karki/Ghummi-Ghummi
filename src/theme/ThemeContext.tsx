import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { LightColors, DarkColors, Spacing, Radius, Typography, Shadows, Layout, FontStack, FontSerif } from './colors';

type ThemeColors = typeof LightColors | typeof DarkColors;

interface ThemeContextType {
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  themeMode: 'light' | 'dark' | 'system';
}

const ThemeContext = createContext<ThemeContextType>({
  colors: LightColors,
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
  themeMode: 'system',
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: 'light' | 'dark' | 'system';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = 'system' 
}) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(initialTheme);

  const isDark = themeMode === 'system' 
    ? systemColorScheme === 'dark'
    : themeMode === 'dark';

  const colors = isDark ? DarkColors : LightColors;

  const toggleTheme = useCallback(() => {
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const setTheme = useCallback((theme: 'light' | 'dark' | 'system') => {
    setThemeMode(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme, setTheme, themeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Re-export theme utilities
export { Spacing, Radius, Typography, Shadows, Layout, FontStack, FontSerif };
