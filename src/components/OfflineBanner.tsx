import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform, TouchableOpacity } from 'react-native';
import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius } from '../theme/colors';
import { Icon, IconName } from './Icon';
import { hapticLight } from '../utils/haptics';

type OfflineBannerProps = {
  onRetry?: () => void;
};

export function OfflineBanner({ onRetry }: OfflineBannerProps) {
  const insets = useSafeAreaInsets();
  const [isOffline, setIsOffline] = useState(false);
  const translateY = useRef(new Animated.Value(-60)).current;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setIsOffline(offline);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: isOffline ? 0 : -60,
      damping: 15,
      stiffness: 150,
      useNativeDriver: true,
    }).start();
  }, [isOffline]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: Math.max(insets.top, Platform.OS === 'ios' ? 54 : 36),
          transform: [{ translateY }],
        },
      ]}
      pointerEvents="box-none"
    >
      <View style={styles.content}>
        <Icon name={IconName.Wifi} size={14} color={Colors.white} />
        <Text style={styles.text} numberOfLines={1}>
          You're offline. Some features may be limited.
        </Text>
        {onRetry && (
          <TouchableOpacity
            onPress={() => {
              hapticLight();
              onRetry();
            }}
            style={styles.retryBtn}
            activeOpacity={0.7}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1500,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.warning,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
  },
  text: {
    ...Typography.caption,
    color: Colors.white,
    flex: 1,
    fontWeight: '500',
  },
  retryBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  retryText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '700',
  },
});
