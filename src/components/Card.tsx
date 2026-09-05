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
import { Colors, Typography, Spacing, Radius, Shadows } from '../theme/colors';
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
  const handlePress = () => {
    hapticLight();
    onPress?.();
  };

  if (variant === 'list') {
    return (
      <TouchableOpacity
        style={[styles.listCard, style]}
        onPress={handlePress}
        activeOpacity={0.85}
        accessibilityLabel={accessibilityLabel || `${name}, ${type || ''} ${price || ''}`}
        accessibilityRole="button"
      >
        <Image source={{ uri: image }} style={styles.listImage} />
        <View style={styles.listContent}>
          <View style={styles.listInfo}>
            <Text style={styles.listName} numberOfLines={1}>{name}</Text>
            {type && <Text style={styles.listMeta}>{type}</Text>}
          </View>
          <View style={styles.listRight}>
            {match && (
              <View style={styles.matchBadge}>
                <Text style={styles.matchText}>{match}%</Text>
              </View>
            )}
            {rating && (
              <View style={styles.ratingRow}>
                <Icon name={IconName.Star} size={11} color={Colors.primaryGold} />
                <Text style={styles.ratingText}>{rating.toFixed(2)}</Text>
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
        variant === 'featured' ? styles.featuredCard : styles.gridCard,
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
        <View style={styles.badge}>
          <Icon name={IconName.Star} size={10} color={Colors.primaryGold} strokeWidth={2.2} />
          <Text style={styles.badgeText}>{match}%</Text>
        </View>
      )}
      <View style={styles.cardInfo}>
        <Text style={variant === 'featured' ? styles.featuredName : styles.gridName} numberOfLines={1}>
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
  return (
    <View style={[styles.carouselContainer, { height }]}>
      <Image source={{ uri: images[activeIndex] }} style={styles.carouselImage} />
      {images.length > 1 && (
        <View style={styles.carouselDots}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[styles.carouselDot, i === activeIndex && styles.carouselDotActive]}
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
    backgroundColor: Colors.surface,
    ...Shadows.sm,
  },
  gridImage: {
    width: '100%',
    height: 160,
  },
  gridName: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    fontWeight: '500',
  },

  // Featured card
  featuredCard: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    ...Shadows.sm,
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  featuredName: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '500',
  },

  // List card
  listCard: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.md,
    backgroundColor: Colors.surface,
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
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  listMeta: {
    ...Typography.caption,
    color: Colors.textTertiary,
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
    color: Colors.white,
    fontWeight: '600',
  },
  matchBadge: {
    backgroundColor: Colors.citron,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  matchText: {
    ...Typography.caption,
    color: Colors.textPrimary,
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
    color: Colors.textPrimary,
    fontWeight: '500',
  },

  // Carousel
  carouselContainer: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.skeleton,
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
    backgroundColor: Colors.white,
  },
});
