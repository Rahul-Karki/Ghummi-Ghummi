import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, Typography, Spacing, Radius } from '../theme/ThemeContext';
import { Icon, IconName } from './Icon';
import { hapticLight } from '../utils/haptics';

export default function TopBar({
  light = false,
  onBack,
}: {
  light?: boolean;
  onBack?: () => void;
}) {
  const { colors } = useTheme();
  const color = light ? colors.white : colors.black;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          hapticLight();
          onBack?.();
        }}
        style={styles.backBtn}
        activeOpacity={0.6}
        accessibilityLabel="Go back"
        accessibilityRole="button"
      >
        <Icon name={IconName.ArrowLeft} size={20} color={color} strokeWidth={2} />
      </TouchableOpacity>
      <Text style={[styles.wordmark, { color }]}>
        <Text style={{ letterSpacing: -1.92 }}>Y</Text>
        <Text>on</Text>
        <Text style={{ letterSpacing: -0.48 }}>d</Text>
        <Text>r</Text>
      </Text>
      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordmark: {
    fontFamily: 'Georgia',
    fontSize: 19.17,
    letterSpacing: -1.15,
  },
});
