import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Typography, Spacing } from '../theme/ThemeContext';

export default function StatusBar({ light = false }: { light?: boolean }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const color = light ? colors.white : colors.textPrimary;

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, Spacing.xl) }]}>
      <Text style={[styles.time, { color }]}>9:41</Text>
      <View style={[styles.battery, { borderColor: color }]}>
        <View style={[styles.batteryFill, { backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  time: {
    ...Typography.captionSmall,
    letterSpacing: 0.05,
  },
  battery: {
    width: 20,
    height: 12.5,
    borderWidth: 1.25,
    borderRadius: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  batteryFill: {
    width: 10,
    height: 5,
    borderRadius: 7.5,
  },
});
