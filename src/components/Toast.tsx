import React, { useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius, Shadows } from '../theme/colors';
import { Icon, IconName } from './Icon';
import { hapticSuccess, hapticLight, hapticMedium } from '../utils/haptics';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

type ToastAction = {
  label: string;
  onPress: () => void;
};

type ToastProps = {
  message: string;
  variant?: ToastVariant;
  visible: boolean;
  onDismiss?: () => void;
  duration?: number;
  action?: ToastAction;
  position?: 'top' | 'bottom';
};

const VARIANT_CONFIG: Record<
  ToastVariant,
  { icon: typeof IconName.Home; bgColor: string; iconColor: string }
> = {
  success: {
    icon: IconName.Heart,
    bgColor: Colors.success,
    iconColor: Colors.white,
  },
  error: {
    icon: IconName.Heart,
    bgColor: Colors.error,
    iconColor: Colors.white,
  },
  warning: {
    icon: IconName.Heart,
    bgColor: Colors.warning,
    iconColor: Colors.white,
  },
  info: {
    icon: IconName.Heart,
    bgColor: Colors.primary,
    iconColor: Colors.white,
  },
};

export function Toast({
  message,
  variant = 'success',
  visible,
  onDismiss,
  duration = 3000,
  action,
  position = 'top',
}: ToastProps) {
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(position === 'top' ? -30 : 30)).current;
  const config = VARIANT_CONFIG[variant];

  const dismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: position === 'top' ? -30 : 30,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss?.());
  }, [opacity, translateY, onDismiss, position]);

  useEffect(() => {
    if (visible) {
      if (variant === 'success') hapticSuccess();
      else if (variant === 'error') hapticMedium();
      else if (variant === 'warning') hapticLight();

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          damping: 15,
          stiffness: 150,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(dismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const topPosition = position === 'top'
    ? { top: Math.max(insets.top, Platform.OS === 'ios' ? 54 : 36) }
    : undefined;
  const bottomPosition = position === 'bottom'
    ? { bottom: Math.max(insets.bottom, Spacing.lg) }
    : undefined;

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: config.bgColor },
        topPosition,
        bottomPosition,
        { opacity, transform: [{ translateY }] },
      ]}
      pointerEvents="box-none"
    >
      <Icon name={config.icon} size={16} color={config.iconColor} />
      <Text style={styles.message} numberOfLines={2}>
        {message}
      </Text>
      {action && (
        <TouchableOpacity
          onPress={() => {
            hapticLight();
            action.onPress();
            dismiss();
          }}
          style={styles.actionBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.actionLabel}>{action.label}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={dismiss}
        style={styles.closeBtn}
        activeOpacity={0.6}
        accessibilityLabel="Dismiss notification"
      >
        <Icon name={IconName.Search} size={12} color={config.iconColor} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: Spacing.lg,
    right: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    zIndex: 1000,
    ...Shadows.lg,
  },
  message: {
    ...Typography.bodySmall,
    color: Colors.white,
    flex: 1,
    fontWeight: '500',
  },
  actionBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  actionLabel: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '700',
  },
  closeBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
});
