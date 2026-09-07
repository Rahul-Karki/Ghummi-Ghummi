import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, FontBrand } from '../theme/ThemeContext';

export default function YMark({ light = false }: { light?: boolean }) {
  const borderColor = light ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const fillColor = light ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  return (
    <View style={[styles.container, { borderColor }]}>
      <View style={styles.inner}>
        <Text style={[styles.y, { color: fillColor }]}>Y</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 23,
    height: 30.307,
    borderWidth: 1.198,
    borderRadius: 17.969,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    transform: [{ rotate: '180deg' }],
  },
  y: {
    fontFamily: FontBrand,
    fontSize: 14,
  },
});
