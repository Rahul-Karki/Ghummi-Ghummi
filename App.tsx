import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Text, TextInput } from 'react-native';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { GeistMono_400Regular, GeistMono_500Medium } from '@expo-google-fonts/geist-mono';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import './src/theme/fonts';

// React Native has no inherited font family. Set a baseline so text that does
// not use a Typography token cannot fall back to the iOS/Android system font.
function setDefaultFont(Component: typeof Text | typeof TextInput) {
  const component = Component as typeof Component & { defaultProps?: { style?: unknown } };
  component.defaultProps = {
    ...component.defaultProps,
    style: [component.defaultProps?.style, { fontFamily: 'Inter' }],
  };
}

setDefaultFont(Text);
setDefaultFont(TextInput);

function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
    'Geist Mono': GeistMono_400Regular,
    'Geist Mono-Medium': GeistMono_500Medium,
  });

  // Do not render with a platform fallback font and then switch after loading.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
