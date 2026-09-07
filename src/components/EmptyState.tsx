import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Typography, Spacing } from '../theme/ThemeContext';
import { Icon, IconName } from './Icon';

type EmptyStateProps = {
  icon?: typeof IconName.Home;
  title: string;
  description?: string;
  action?: React.ReactNode;
  style?: ViewStyle;
};

export function EmptyState({
  icon = IconName.Search,
  title,
  description,
  action,
  style,
}: EmptyStateProps) {
  const { colors } = useTheme();
  return (
      <View style={[styles.container, style]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.surfaceSubtle }]}>
        <Icon name={icon} size={48} color={colors.mutedFaint} strokeWidth={1.2} />
      </View>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      {description && (
        <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>
      )}
      {action && <View style={styles.action}>{action}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.huge,
    paddingHorizontal: Spacing.xxxl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h3,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  description: {
    ...Typography.body,
    textAlign: 'center',
    lineHeight: 20,
  },
  action: {
    marginTop: Spacing.xl,
  },
});
