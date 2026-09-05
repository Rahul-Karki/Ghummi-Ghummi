import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { Colors, Typography, Radius } from '../theme/colors';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type AvatarProps = {
  source?: string;
  name?: string;
  size?: AvatarSize;
  style?: ViewStyle;
};

const SIZE_MAP: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 72,
};

const FONT_SIZE_MAP: Record<AvatarSize, number> = {
  xs: 10,
  sm: 13,
  md: 16,
  lg: 22,
  xl: 28,
};

export function Avatar({ source, name, size = 'md', style }: AvatarProps) {
  const dim = SIZE_MAP[size];
  const fontSize = FONT_SIZE_MAP[size];
  const initials = name ? name.charAt(0).toUpperCase() : '?';

  if (source) {
    const imageStyle: ImageStyle = {
      width: dim,
      height: dim,
      borderRadius: dim / 2,
    };
    return (
      <Image
        source={{ uri: source }}
        style={imageStyle}
      />
    );
  }

  return (
    <View
      style={[
        styles.fallback,
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
        },
        style,
      ]}
    >
      <Text style={[styles.initial, { fontSize }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontFamily: 'Georgia',
    color: Colors.white,
    fontWeight: '400',
  },
});
