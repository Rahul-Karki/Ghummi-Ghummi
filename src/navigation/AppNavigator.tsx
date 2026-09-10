import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../theme/ThemeContext';
import { Icon, IconName } from '../components/Icon';
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

export type ExploreStackParamList = {
  Intro: undefined;
  V1Gallery: undefined;
  V2ScanSave: { query?: string } | undefined;
  V3ImageLed: undefined;
  PropertyDetails: { listing?: any; listingId?: string };
  AIGeneration: undefined;
};

type AppTabParamList = { Explore: undefined; Trips: undefined; Map: undefined; Saved: undefined; Profile: undefined };

const ExploreStack = createStackNavigator<ExploreStackParamList>();
const Tab = createBottomTabNavigator<AppTabParamList>();

function ExploreNavigator() {
  const { colors } = useTheme();
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: colors.background } }}>
      <ExploreStack.Screen name="Intro" component={IntroScreen} />
      <ExploreStack.Screen name="V1Gallery" component={V1GalleryScreen} />
      <ExploreStack.Screen name="V2ScanSave" component={V2ScanSaveScreen} />
      <ExploreStack.Screen name="V3ImageLed" component={V3ImageLedScreen} />
      <ExploreStack.Screen name="PropertyDetails" component={PropertyDetailsScreen} options={{ gestureEnabled: true }} />
      <ExploreStack.Screen name="AIGeneration" component={AIGenerationScreen} />
    </ExploreStack.Navigator>
  );
}

const tabIcons: Record<keyof AppTabParamList, (typeof IconName)[keyof typeof IconName]> = {
  Explore: IconName.Home, Saved: IconName.Heart, Map: IconName.MapPin, Trips: IconName.Plane, Profile: IconName.User,
};

export default function AppNavigator() {
  const { colors, isDark } = useTheme();
  const navigationTheme = { ...DefaultTheme, dark: isDark, colors: { ...DefaultTheme.colors, primary: colors.primaryGold, background: colors.background, card: colors.surface, text: colors.textPrimary, border: colors.border, notification: colors.accentCoral } };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          animation: 'fade',
          tabBarActiveTintColor: colors.primaryGold,
          tabBarInactiveTintColor: colors.textTertiary,
          tabBarStyle: { height: 82, paddingTop: 8, paddingBottom: 12, backgroundColor: colors.surfaceElevated, borderTopColor: colors.border },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
          tabBarIcon: ({ color, focused }) => <Icon name={tabIcons[route.name]} size={22} color={color} strokeWidth={focused ? 2.2 : 1.7} />,
        })}
      >
        <Tab.Screen name="Explore" component={ExploreNavigator} />
        <Tab.Screen name="Trips" component={TripsScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
