import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { useTheme, Typography, Spacing, Radius, Shadows } from '../theme/ThemeContext';
import { Icon, IconName } from './Icon';
import { Pill } from './Pill';
import { hapticLight } from '../utils/haptics';

type PropertyCardProps = {
  image: string;
  name: string;
  match?: number;
  rating?: number;
  type?: string;
  price?: string;
  onPress?: () => void;
  variant?: 'grid' | 'featured' | 'list';
  style?: ViewStyle;
  accessibilityLabel?: string;
};

export function PropertyCard({
  image,
  name,
  match,
  rating,
  type,
  price,
  onPress,
  variant = 'grid',
  style,
  accessibilityLabel,
}: PropertyCardProps) {
  const { colors } = useTheme();
  const handlePress = () => {
    hapticLight();
    onPress?.();
  };

  if (variant === 'list') {
    return (
      <TouchableOpacity
        style={[styles.listCard, { backgroundColor: colors.surface }, style]}
        onPress={handlePress}
        activeOpacity={0.85}
        accessibilityLabel={accessibilityLabel || `${name}, ${type || ''} ${price || ''}`}
        accessibilityRole="button"
      >
        <Image source={{ uri: image }} style={styles.listImage} />
        <View style={styles.listContent}>
          <View style={styles.listInfo}>
            <Text style={[styles.listName, { color: colors.textPrimary }]} numberOfLines={1}>{name}</Text>
            {type && <Text style={[styles.listMeta, { color: colors.textTertiary }]}>{type}</Text>}
          </View>
          <View style={styles.listRight}>
            {match && (
      <View style={[styles.matchBadge, { backgroundColor: colors.citron }]}>
            <Text style={[styles.matchText, { color: colors.textPrimary }]}>{match}%</Text>
              </View>
            )}
            {rating && (
    <View style={[styles.ratingRow]}>
              <Icon name={IconName.Star} size={11} color={colors.primaryGold} />
              <Text style={[styles.ratingText, { color: colors.textPrimary }]}>{rating.toFixed(2)}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        variant === 'grid' ? styles.gridCard : styles.featuredCard,
        { backgroundColor: colors.surface },
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.85}
      accessibilityLabel={accessibilityLabel || `${name}, ${type || ''} ${price || ''}`}
      accessibilityRole="button"
    >
      <Image source={{ uri: image }} style={variant === 'featured' ? styles.featuredImage : styles.gridImage} />
      <View style={styles.overlay} />
      {match && (
        <View style={[styles.badge, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <Icon name={IconName.Star} size={10} color={colors.primaryGold} strokeWidth={2.2} />
          <Text style={[styles.badgeText, { color: colors.white }]}>{match}%</Text>
        </View>
      )}
      <View style={styles.cardInfo}>
        <Text style={[variant === 'featured' ? styles.featuredName : styles.gridName, { color: colors.textPrimary }]} numberOfLines={1}>
          {name}
        </Text>
        {type && price && (
          <Text style={styles.cardMeta}>{price} · {type}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

type ImageCarouselProps = {
  images: string[];
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  height?: number;
};

export function ImageCarousel({
  images,
  activeIndex = 0,
  onIndexChange,
  height = 300,
}: ImageCarouselProps) {
  const { colors } = useTheme();
  return (
    <View       style={[styles.carouselContainer, { height, backgroundColor: colors.skeleton }]}>
      <Image source={{ uri: images[activeIndex] }} style={styles.carouselImage} />
      {images.length > 1 && (
        <View style={styles.carouselDots}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[styles.carouselDot, i === activeIndex && [styles.carouselDotActive, { backgroundColor: colors.white }]]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Grid card
  gridCard: {
    borderRadius: Radius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  gridImage: {
    width: '100%',
    height: 160,
  },
  gridName: {
    ...Typography.bodySmall,
    fontWeight: '500',
  },

  // Featured card
  featuredCard: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  featuredName: {
    ...Typography.body,
    fontWeight: '500',
  },

  // List card
  listCard: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.md,
    alignItems: 'flex-start',
  },
  listImage: {
    width: 90,
    height: 82,
    borderRadius: Radius.sm,
  },
  listContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listInfo: {
    flex: 1,
    gap: 6,
  },
  listName: {
    ...Typography.body,
    fontWeight: '500',
  },
  listMeta: {
    ...Typography.caption,
  },
  listRight: {
    alignItems: 'flex-end',
    gap: 6,
  },

  // Shared
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  badge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  badgeText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  matchBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  matchText: {
    ...Typography.caption,
    fontWeight: '500',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cardMeta: {
    ...Typography.caption,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    ...Typography.caption,
    fontWeight: '500',
  },

  // Carousel
  carouselContainer: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselDots: {
    position: 'absolute',
    bottom: Spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  carouselDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  carouselDotActive: {
    width: 20,
  },
});
