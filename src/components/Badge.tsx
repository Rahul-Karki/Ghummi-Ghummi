import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Typography, Radius, Spacing } from '../theme/ThemeContext';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md';

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  style?: ViewStyle;
};

const STATIC_BADGE_COLORS: Record<BadgeVariant, { bg: string; text: string }> = {
  default: { bg: '', text: '' },
  success: { bg: '#E8F5E9', text: '#2E7D32' },
  warning: { bg: '#FFF3E0', text: '#E65100' },
  error: { bg: '#FFEBEE', text: '#C62828' },
  info: { bg: '#E3F2FD', text: '#1565C0' },
};

export function Badge({
  label,
  variant = 'default',
  size = 'sm',
  icon,
  style,
}: BadgeProps) {
  const { colors } = useTheme();
  const variantColors = variant === 'default'
    ? { bg: colors.secondary, text: colors.primary }
    : STATIC_BADGE_COLORS[variant];

  return (
    <View
      style={[
        styles.base,
        { backgroundColor: variantColors.bg },
        size === 'md' && styles.md,
        style,
      ]}
    >
      {icon}
      <Text
        style={[
          styles.label,
          { color: variantColors.text },
          size === 'md' ? styles.labelMd : undefined,
          icon ? { marginLeft: 4 } : undefined,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  md: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  label: {
    ...Typography.caption,
    fontWeight: '600',
  },
  labelMd: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
});
