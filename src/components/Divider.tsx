import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing } from '../theme/colors';

type DividerProps = {
  variant?: 'default' | 'inset' | 'middle';
  color?: string;
  thickness?: number;
  style?: ViewStyle;
};

export function Divider({
  variant = 'default',
  color = Colors.border,
  thickness = 1,
  style,
}: DividerProps) {
  return (
    <View
      style={[
        styles.divider,
        { backgroundColor: color, height: thickness },
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
