import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Spacing } from '../theme/ThemeContext';

type DividerProps = {
  variant?: 'default' | 'inset' | 'middle';
  color?: string;
  thickness?: number;
  style?: ViewStyle;
};

export function Divider({
  variant = 'default',
  color,
  thickness = 1,
  style,
}: DividerProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.divider,
        { backgroundColor: color || colors.border, height: thickness },
        variant === 'inset' && styles.inset,
        variant === 'middle' && styles.middle,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
  inset: {
    marginLeft: Spacing.xxl,
  },
  middle: {
    marginLeft: Spacing.xxl,
    marginRight: Spacing.xxl,
  },
});
