import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Typography, Radius, Spacing } from '../theme/ThemeContext';

type PillProps = {
  children: React.ReactNode;
  bg?: string;
};

export function Pill({ children, bg }: PillProps) {
  const { colors } = useTheme();
  return (
    <View style={[pillStyles.pill, { backgroundColor: bg || colors.citron }]}>
      <Text style={[pillStyles.text, { color: colors.black }]}>{children}</Text>
    </View>
  );
}

const pillStyles = StyleSheet.create({
  pill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
  },
  text: {
    ...Typography.caption,
    fontWeight: '500',
  },
});

type MatchPillProps = {
  children: React.ReactNode;
};

export function MatchPill({ children }: MatchPillProps) {
  const { colors } = useTheme();
  return (
    <View style={[matchStyles.pill, { backgroundColor: colors.pin }]}>
      <Text style={[matchStyles.text, { color: colors.black }]}>{children}</Text>
    </View>
  );
}

const matchStyles = StyleSheet.create({
  pill: {
    opacity: 0.9,
    paddingHorizontal: Spacing.sm + 3,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  text: {
    ...Typography.caption,
    fontWeight: '500',
  },
});
