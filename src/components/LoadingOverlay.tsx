import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadows } from '../theme/colors';

type LoadingOverlayProps = {
  visible: boolean;
  message?: string;
  submessage?: string;
};

export function LoadingOverlay({
  visible,
  message = 'Loading...',
  submessage,
}: LoadingOverlayProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          damping: 15,
          stiffness: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.container, { opacity }]}
      pointerEvents="box-none"
    >
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <LoadingSpinner />
        <Text style={styles.message}>{message}</Text>
        {submessage && <Text style={styles.submessage}>{submessage}</Text>}
      </Animated.View>
    </Animated.View>
  );
}

function LoadingSpinner() {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]}>
      <View style={styles.spinnerTrack} />
      <View style={styles.spinnerDot} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.overlayLight,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1800,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.xxxl,
    paddingVertical: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.md,
    ...Shadows.lg,
  },
  spinner: {
    width: 36,
    height: 36,
    marginBottom: Spacing.sm,
  },
  spinnerTrack: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: Colors.mutedFaint,
    borderTopColor: Colors.primary,
  },
  spinnerDot: {
    position: 'absolute',
    top: 0,
    left: 15,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primaryGold,
  },
  message: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
  submessage: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
