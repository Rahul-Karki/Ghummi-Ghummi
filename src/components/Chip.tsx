import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Typography, Spacing, Radius } from '../theme/ThemeContext';
import { hapticLight } from '../utils/haptics';

type ChipVariant = 'default' | 'active' | 'outline';
type ChipSize = 'sm' | 'md';

type ChipProps = {
  label: string;
  onPress?: () => void;
  variant?: ChipVariant;
  size?: ChipSize;
  selected?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

export function Chip({
  label,
  onPress,
  variant = 'default',
  size = 'md',
  selected = false,
  disabled = false,
  icon,
  style,
  accessibilityLabel,
}: ChipProps) {
  const { colors } = useTheme();
  const isActive = selected || variant === 'active';

  const handlePress = () => {
    if (!disabled) {
      hapticLight();
      onPress?.();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        { backgroundColor: isActive ? colors.olive : colors.secondaryFaint },
        styles[`size_${size}`],
        variant === 'outline' && { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.borderStrong },
        disabled && styles.disabled,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive, disabled }}
    >
      {icon && <React.Fragment>{icon}</React.Fragment>}
      <Text
        style={[
          styles.label,
          styles[`label_${size}`],
          isActive ? { color: colors.white } : undefined,
          variant === 'outline' ? { color: colors.primary } : undefined,
          disabled ? { color: colors.textDisabled } : undefined,
          icon ? { marginLeft: 6 } : undefined,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

type FilterChipGroupProps = {
  options: { key: string; label: string; icon?: React.ReactNode }[];
  selected: string;
  onSelect: (key: string) => void;
  size?: ChipSize;
};

export function FilterChipGroup({
  options,
  selected,
  onSelect,
  size = 'md',
}: FilterChipGroupProps) {
  return (
    <React.Fragment>
      {options.map((option) => (
        <Chip
          key={option.key}
          label={option.label}
          icon={option.icon}
          selected={selected === option.key}
          onPress={() => onSelect(option.key)}
          size={size}
        />
      ))}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.5,
  },

  size_sm: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
  },
  size_md: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
  },

  label: {
    ...Typography.caption,
  },
  label_sm: {
    fontSize: 11,
  },
  label_md: {
    ...Typography.caption,
  },
});
