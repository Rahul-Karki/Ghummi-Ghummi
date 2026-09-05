import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme/colors';
import { hapticLight } from '../utils/haptics';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
  accessibilityLabel,
}: ButtonProps) {
  const handlePress = () => {
    hapticLight();
    onPress();
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'danger' ? Colors.white : Colors.primary}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <React.Fragment>{icon}</React.Fragment>
          )}
          <Text
            style={[
              styles.label,
              styles[`label_${size}`],
              styles[`label_${variant}`],
              isDisabled ? styles.labelDisabled : undefined,
              icon ? (iconPosition === 'right' ? { marginRight: 0, marginLeft: 8 } : { marginRight: 8, marginLeft: 0 }) : undefined,
              textStyle,
            ]}
          >
            {label}
          </Text>
          {icon && iconPosition === 'right' && (
            <React.Fragment>{icon}</React.Fragment>
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

type IconButtonProps = {
  icon: React.ReactNode;
  onPress: () => void;
  size?: number;
  variant?: 'default' | 'filled' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel: string;
  style?: ViewStyle;
};

export function IconButton({
  icon,
  onPress,
  size = 44,
  variant = 'default',
  disabled = false,
  loading = false,
  accessibilityLabel,
  style,
}: IconButtonProps) {
  const handlePress = () => {
    hapticLight();
    onPress();
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.iconButton,
        { width: size, height: size, borderRadius: size / 2 },
        styles[`iconBtn_${variant}`],
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'filled' ? Colors.white : Colors.primary}
        />
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.full,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },

  // Variants
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.borderStrong,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: Colors.error,
  },

  // Sizes
  size_sm: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    minHeight: 36,
  },
  size_md: {
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    minHeight: 48,
  },
  size_lg: {
    paddingHorizontal: Spacing.xxxl,
    paddingVertical: Spacing.lg,
    minHeight: 56,
  },

  // Labels
  label: {
    letterSpacing: 0.3,
  },
  label_sm: {
    ...Typography.buttonSmall,
  },
  label_md: {
    ...Typography.button,
  },
  label_lg: {
    ...Typography.button,
    fontSize: 16,
  },
  label_primary: {
    color: Colors.white,
  },
  label_secondary: {
    color: Colors.primary,
  },
  label_outline: {
    color: Colors.primary,
  },
  label_ghost: {
    color: Colors.primary,
  },
  label_danger: {
    color: Colors.white,
  },
  labelDisabled: {
    color: Colors.textDisabled,
  },

  // Icon Button
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtn_default: {
    backgroundColor: 'transparent',
  },
  iconBtn_filled: {
    backgroundColor: Colors.primary,
  },
  iconBtn_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.borderStrong,
  },
});
