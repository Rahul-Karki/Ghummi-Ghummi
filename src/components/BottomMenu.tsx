import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Typography, Spacing, Radius, Shadows } from '../theme/ThemeContext';
import { Icon, IconName } from './Icon';
import { hapticLight } from '../utils/haptics';

type MenuItem = {
  label: string;
  icon: typeof IconName.Home;
};

const MENU_ITEMS: MenuItem[] = [
  { label: 'Explore', icon: IconName.Compass },
  { label: 'Saved', icon: IconName.Bookmark },
  { label: 'Trips', icon: IconName.Plane },
  { label: 'Profile', icon: IconName.User },
];

type BottomMenuProps = {
  activeTab?: string;
  navigation?: any;
};

export default function BottomMenu({ activeTab = 'Explore', navigation }: BottomMenuProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const handleTabPress = (label: string) => {
    hapticLight();
    if (label === 'Explore') {
      navigation?.navigate('Intro');
    } else if (label === 'Saved') {
      navigation?.navigate('Saved');
    } else if (label === 'Trips') {
      navigation?.navigate('Trips');
    } else if (label === 'Profile') {
      navigation?.navigate('Profile');
    }
  };

  return (
    <View
      style={[
        styles.container,
        { 
          paddingBottom: Math.max(insets.bottom, Spacing.md),
          backgroundColor: colors.cardWhite,
        },
      ]}
    >
      {MENU_ITEMS.map((item) => {
        const isActive = item.label === activeTab;
        return (
          <TouchableOpacity
            key={item.label}
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => handleTabPress(item.label)}
            accessibilityLabel={item.label}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Icon
              name={item.icon}
              size={20}
              color={isActive ? colors.primaryGold : colors.mutedFaint}
              strokeWidth={isActive ? 2 : 1.5}
            />
            <Text style={[
              styles.label, 
              { color: colors.mutedFaint },
              isActive && styles.labelActive,
              isActive && { color: colors.primaryGold }
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.11,
    shadowRadius: 30,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 48,
    minHeight: 48,
    paddingVertical: Spacing.xs,
    gap: 4,
  },
  label: {
    ...Typography.caption,
    fontWeight: '300',
  },
  labelActive: {
    fontWeight: '600',
  },
});
