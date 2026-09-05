import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet, Dimensions } from 'react-native';
import { Colors, Radius, Spacing } from '../theme/colors';

const SHIMMER_WIDTH = Dimensions.get('window').width;

type SkeletonProps = {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
};

export function Skeleton({
  width = '100%',
  height = 16,
  borderRadius = Radius.sm,
  style,
}: SkeletonProps) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-SHIMMER_WIDTH, SHIMMER_WIDTH],
  });

  return (
    <View
      style={[
        styles.skeleton,
        { width, height, borderRadius },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
}

export function SkeletonCard({ style }: { style?: any }) {
  return (
    <View style={[styles.cardSkeleton, style]}>
      <Skeleton height={180} borderRadius={Radius.lg} />
      <View style={styles.cardContent}>
        <Skeleton width="60%" height={16} />
        <Skeleton width="40%" height={12} style={{ marginTop: 8 }} />
        <Skeleton width="30%" height={12} style={{ marginTop: 6 }} />
      </View>
    </View>
  );
}

export function SkeletonExploreCard({ style }: { style?: any }) {
  return (
    <View style={[styles.exploreCardSkeleton, style]}>
      <Skeleton height={320} borderRadius={Radius.xl} />
    </View>
  );
}

export function SkeletonListingRow({ style }: { style?: any }) {
  return (
    <View style={[styles.listingRowSkeleton, style]}>
      <Skeleton width={90} height={82} borderRadius={Radius.sm} />
      <View style={styles.listingRowContent}>
        <Skeleton width="70%" height={14} />
        <Skeleton width="50%" height={12} style={{ marginTop: 8 }} />
        <Skeleton width="30%" height={12} style={{ marginTop: 6 }} />
      </View>
    </View>
  );
}

export function SkeletonHero({ style }: { style?: any }) {
  return (
    <View style={[styles.heroSkeleton, style]}>
      <Skeleton height={300} borderRadius={0} />
      <View style={styles.heroContent}>
        <Skeleton width={120} height={28} borderRadius={Radius.full} />
        <Skeleton width="80%" height={20} style={{ marginTop: 12 }} />
        <Skeleton width="60%" height={14} style={{ marginTop: 8 }} />
        <Skeleton width="100%" height={52} borderRadius={Radius.lg} style={{ marginTop: 16 }} />
      </View>
    </View>
  );
}

export function SkeletonPropertyDetail({ style }: { style?: any }) {
  return (
    <View style={[styles.detailSkeleton, style]}>
      <Skeleton height={320} borderRadius={0} />
      <View style={styles.detailContent}>
        <Skeleton width={80} height={14} borderRadius={Radius.full} />
        <Skeleton width="70%" height={24} style={{ marginTop: 10 }} />
        <View style={styles.detailMeta}>
          <Skeleton width={60} height={14} borderRadius={Radius.full} />
          <Skeleton width={60} height={14} borderRadius={Radius.full} />
          <Skeleton width={60} height={14} borderRadius={Radius.full} />
        </View>
        <Skeleton width="100%" height={1} style={{ marginTop: 16 }} />
        <Skeleton width="90%" height={14} style={{ marginTop: 16 }} />
        <Skeleton width="75%" height={14} style={{ marginTop: 6 }} />
        <Skeleton width="85%" height={14} style={{ marginTop: 6 }} />
        <Skeleton width="100%" height={1} style={{ marginTop: 16 }} />
        <Skeleton width="50%" height={18} style={{ marginTop: 16 }} />
        <View style={styles.amenitiesGrid}>
          <Skeleton width="47%" height={44} borderRadius={Radius.md} />
          <Skeleton width="47%" height={44} borderRadius={Radius.md} />
          <Skeleton width="47%" height={44} borderRadius={Radius.md} />
          <Skeleton width="47%" height={44} borderRadius={Radius.md} />
        </View>
      </View>
    </View>
  );
}

export function SkeletonMapPin({ style }: { style?: any }) {
  return (
    <View style={[styles.mapPinSkeleton, style]}>
      <Skeleton width={36} height={36} borderRadius={18} />
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.shimmer,
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  cardSkeleton: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  cardContent: {
    paddingTop: Spacing.md,
    gap: 0,
  },
  exploreCardSkeleton: {
    width: SHIMMER_WIDTH * 0.75,
  },
  listingRowSkeleton: {
    flexDirection: 'row',
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  listingRowContent: {
    flex: 1,
    gap: 0,
  },
  heroSkeleton: {
    width: '100%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.xl,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  detailSkeleton: {
    width: '100%',
  },
  detailContent: {
    padding: Spacing.xl,
  },
  detailMeta: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: 10,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginTop: 12,
  },
  mapPinSkeleton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
