import React, { useState } from 'react';
import { View, Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { useTheme, Radius } from '../theme/ThemeContext';
import { Icon, IconName } from './Icon';

type ImagePlaceholderProps = {
  uri?: string;
  style?: ViewStyle | ImageStyle;
  borderRadius?: number;
  iconSize?: number;
};

export function ImagePlaceholder({
  uri,
  style,
  borderRadius = Radius.md,
  iconSize = 24,
}: ImagePlaceholderProps) {
  const { colors } = useTheme();
  const [loadError, setLoadError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!uri || loadError) {
    return (
      <View style={[styles.placeholder, { borderRadius, backgroundColor: colors.skeleton }, style]}>
        <Icon name={IconName.Image} size={iconSize} color={colors.mutedFaint} strokeWidth={1.2} />
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={[{ borderRadius }, style as ImageStyle]}
      onLoad={() => setLoaded(true)}
      onError={() => setLoadError(true)}
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
