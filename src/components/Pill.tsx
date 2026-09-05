import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Radius, Spacing } from '../theme/colors';

type PillProps = {
  children: React.ReactNode;
  bg?: string;
};

export function Pill({ children, bg = Colors.citron }: PillProps) {
  return (
    <View style={[pillStyles.pill, { backgroundColor: bg }]}>
      <Text style={pillStyles.text}>{children}</Text>
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
    color: Colors.black,
    fontWeight: '500',
  },
});

type MatchPillProps = {
  children: React.ReactNode;
};

export function MatchPill({ children }: MatchPillProps) {
  return (
    <View style={matchStyles.pill}>
      <Text style={matchStyles.text}>{children}</Text>
    </View>
  );
}

const matchStyles = StyleSheet.create({
  pill: {
    backgroundColor: Colors.pin,
    opacity: 0.9,
    paddingHorizontal: Spacing.sm + 3,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  text: {
    ...Typography.caption,
    color: Colors.black,
    fontWeight: '500',
  },
});
