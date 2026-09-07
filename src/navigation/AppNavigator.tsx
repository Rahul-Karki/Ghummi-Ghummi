import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../theme/ThemeContext';

import IntroScreen from '../screens/IntroScreen';
import V1GalleryScreen from '../screens/V1GalleryScreen';
import V2ScanSaveScreen from '../screens/V2ScanSaveScreen';
import V3ImageLedScreen from '../screens/V3ImageLedScreen';
import PropertyDetailsScreen from '../screens/PropertyDetailsScreen';
import AIGenerationScreen from '../screens/AIGenerationScreen';
import MapScreen from '../screens/MapScreen';
import SavedScreen from '../screens/SavedScreen';
import TripsScreen from '../screens/TripsScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  Intro: undefined;
  V1Gallery: undefined;
  V2ScanSave: undefined;
  V3ImageLed: undefined;
  PropertyDetails: { listing?: any; listingId?: string };
  AIGeneration: undefined;
  Map: undefined;
  Saved: undefined;
  Trips: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const slideRight = ({ current, layouts }: any) => ({
  cardStyle: {
    transform: [
      {
        translateX: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [layouts.screen.width, 0],
        }),
      },
    ],
  },
});

const slideUp = ({ current }: any) => ({
  cardStyle: {
    transform: [
      {
        translateY: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [600, 0],
        }),
      },
    ],
    opacity: current.progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1],
    }),
  },
});

export default function AppNavigator() {
  const { colors } = useTheme();
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background },
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 300 } },
            close: { animation: 'timing', config: { duration: 250 } },
          },
        }}
      >
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="V1Gallery" component={V1GalleryScreen} options={{ cardStyleInterpolator: slideRight }} />
        <Stack.Screen name="V2ScanSave" component={V2ScanSaveScreen} options={{ cardStyleInterpolator: slideRight }} />
        <Stack.Screen name="V3ImageLed" component={V3ImageLedScreen} options={{ cardStyleInterpolator: slideRight }} />
        <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} options={{ cardStyleInterpolator: slideUp, gestureEnabled: true }} />
        <Stack.Screen name="AIGeneration" component={AIGenerationScreen} options={{ cardStyleInterpolator: slideRight }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ cardStyleInterpolator: slideRight }} />
        <Stack.Screen name="Saved" component={SavedScreen} options={{ cardStyleInterpolator: slideRight }} />
        <Stack.Screen name="Trips" component={TripsScreen} options={{ cardStyleInterpolator: slideRight }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ cardStyleInterpolator: slideRight }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
