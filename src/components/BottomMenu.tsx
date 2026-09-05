import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius, Shadows } from '../theme/colors';
import { Icon, IconName } from './Icon';
import { Toast } from './Toast';
import { hapticLight, hapticMedium } from '../utils/haptics';

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
  const [toast, setToast] = useState({ visible: false, message: '' });

  const handleTabPress = (label: string) => {
    hapticLight();
    if (label === 'Explore') {
      navigation?.navigate('Intro');
    } else if (label === 'Saved') {
      setToast({ visible: true, message: 'Saved list coming soon' });
    } else if (label === 'Trips') {
      setToast({ visible: true, message: 'Trips coming soon' });
    } else if (label === 'Profile') {
      setToast({ visible: true, message: 'Profile coming soon' });
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, Spacing.md) },
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
              color={isActive ? Colors.primaryGold : Colors.mutedFaint}
              strokeWidth={isActive ? 2 : 1.5}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
      <Toast
        message={toast.message}
        visible={toast.visible}
        variant="info"
        onDismiss={() => setToast({ visible: false, message: '' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.cardWhite,
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
    color: Colors.mutedFaint,
    fontWeight: '300',
  },
  labelActive: {
    color: Colors.primaryGold,
    fontWeight: '600',
  },
});
