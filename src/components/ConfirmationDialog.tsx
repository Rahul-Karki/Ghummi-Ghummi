import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Typography, Spacing, Radius, Shadows } from '../theme/ThemeContext';
import { Icon, IconName } from './Icon';
import { hapticLight, hapticMedium } from '../utils/haptics';

const { height: SCREEN_H } = Dimensions.get('window');

type ConfirmationDialogProps = {
  visible: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive';
  icon?: typeof IconName.Home;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmationDialog({
  visible,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  icon,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(SCREEN_H)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(sheetTranslateY, {
          toValue: 0,
          damping: 20,
          stiffness: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: SCREEN_H,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  const isDestructive = variant === 'destructive';

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <Animated.View
          style={[styles.overlay, { opacity: overlayOpacity, backgroundColor: colors.overlay }]}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.sheet,
          {
            backgroundColor: colors.white,
            paddingBottom: Math.max(insets.bottom, Spacing.xl),
            transform: [{ translateY: sheetTranslateY }],
          },
        ]}
      >
        <View style={[styles.handle, { backgroundColor: colors.mutedFaint }]} />

        {icon && (
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isDestructive ? '#FFF0F0' : colors.surfaceSubtle },
            ]}
          >
            <Icon
              name={icon}
              size={24}
              color={isDestructive ? colors.error : colors.primary}
            />
          </View>
        )}

        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
        {description && (
          <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>
        )}

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.cancelBtn, { borderColor: colors.borderStrong }]}
            onPress={() => {
              hapticLight();
              onCancel();
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.cancelLabel, { color: colors.textPrimary }]}>{cancelLabel}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.confirmBtn,
              { backgroundColor: isDestructive ? colors.error : colors.primary },
            ]}
            onPress={() => {
              hapticMedium();
              onConfirm();
            }}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.confirmLabel,
                { color: colors.white },
              ]}
            >
              {confirmLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFill,
    zIndex: 2000,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.md,
    alignItems: 'center',
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    marginBottom: Spacing.xl,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
    marginBottom: Spacing.xxl,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelLabel: {
    ...Typography.button,
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmLabel: {
    ...Typography.button,
  },
});
