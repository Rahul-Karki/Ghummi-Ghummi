import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Typography, Spacing, Radius, Shadows } from '../theme/ThemeContext';
import { Icon, IconName } from './Icon';
import { Button } from './Button';

type ErrorStateProps = {
  type?: 'network' | 'server' | 'timeout' | 'generic' | 'ai' | 'image' | 'location';
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  style?: ViewStyle;
};

const ERROR_CONFIG: Record<
  NonNullable<ErrorStateProps['type']>,
  { icon: typeof IconName.Home; title: string; description: string }
> = {
  network: {
    icon: IconName.Wifi,
    title: "You're offline",
    description: 'Some travel features may be unavailable until you connect.',
  },
  server: {
    icon: IconName.Building2,
    title: "Couldn't load data",
    description: 'Something went wrong on our end. Please try again.',
  },
  timeout: {
    icon: IconName.Clock,
    title: 'Request timed out',
    description: 'The server took too long to respond. Check your connection and try again.',
  },
  generic: {
    icon: IconName.Search,
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again.',
  },
  ai: {
    icon: IconName.Compass,
    title: "Couldn't generate your trip",
    description: 'Something went wrong while creating your itinerary. Try again or adjust your preferences.',
  },
  image: {
    icon: IconName.Image,
    title: "Couldn't load image",
    description: 'This image may be unavailable or the connection was lost.',
  },
  location: {
    icon: IconName.MapPin,
    title: 'Location unavailable',
    description: "We couldn't determine your location. Please check your settings.",
  },
};

export function ErrorState({
  type = 'generic',
  title,
  description,
  onRetry,
  retryLabel = 'Try Again',
  style,
}: ErrorStateProps) {
  const { colors } = useTheme();
  const config = ERROR_CONFIG[type];

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Icon
          name={config.icon}
          size={40}
          color={colors.error}
          strokeWidth={1.5}
        />
      </View>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title || config.title}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>{description || config.description}</Text>
      {onRetry && (
        <View style={styles.action}>
          <Button
            label={retryLabel}
            onPress={onRetry}
            variant="outline"
            size="md"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.huge,
    paddingHorizontal: Spacing.xxxl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF0F0',
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
  },
  action: {
    marginTop: Spacing.xl,
  },
});
