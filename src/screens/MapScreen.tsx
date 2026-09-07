import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Typography, Spacing, Radius, Shadows } from '../theme/ThemeContext';
import { Icon, IconName } from '../components/Icon';
import { Toast } from '../components/Toast';
import { LISTINGS, type Listing } from '../data/listings';
import { hapticLight, hapticMedium, hapticSuccess } from '../utils/haptics';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// Hardcoded "map" coordinates for SF area (relative positions 0-1)
const MAP_PINS: Record<string, { x: number; y: number }> = {
  oasis: { x: 0.45, y: 0.35 },
  cozy: { x: 0.32, y: 0.48 },
  garden: { x: 0.58, y: 0.28 },
  coastal: { x: 0.22, y: 0.62 },
  wilderness: { x: 0.72, y: 0.45 },
  seaside: { x: 0.55, y: 0.58 },
  urban: { x: 0.40, y: 0.72 },
  ocean: { x: 0.65, y: 0.68 },
  tiny: { x: 0.28, y: 0.38 },
  bunk: { x: 0.50, y: 0.52 },
  mountain: { x: 0.78, y: 0.32 },
  grand: { x: 0.35, y: 0.55 },
};

type Props = { navigation: any };

export default function MapScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const sheetTranslateY = useRef(new Animated.Value(300)).current;

  const selected = selectedId ? LISTINGS.find((l) => l.id === selectedId) : null;

  const handlePinPress = (id: string) => {
    hapticLight();
    setSelectedId(id);
    Animated.spring(sheetTranslateY, {
      toValue: 0,
      damping: 20,
      stiffness: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseSheet = () => {
    setSelectedId(null);
    Animated.spring(sheetTranslateY, {
      toValue: 300,
      damping: 20,
      stiffness: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleSave = () => {
    hapticSuccess();
    setToast({ visible: true, message: 'Added to saved' });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Map Area */}
      <View style={styles.mapArea}>
        {/* Simulated map background */}
        <View style={styles.mapBackground}>
          {/* Water area */}
          <View style={styles.waterArea} />
          <View style={styles.waterArea2} />

          {/* Roads */}
          <View style={[styles.road, styles.roadH1]} />
          <View style={[styles.road, styles.roadH2]} />
          <View style={[styles.road, styles.roadH3]} />
          <View style={[styles.road, styles.roadV1]} />
          <View style={[styles.road, styles.roadV2]} />
          <View style={[styles.road, styles.roadV3]} />

          {/* Park areas */}
          <View style={styles.park} />
          <View style={styles.park2} />

          {/* Building blocks */}
          <View style={[styles.block, { top: '20%', left: '15%' }]} />
          <View style={[styles.block, { top: '20%', left: '35%' }]} />
          <View style={[styles.block, { top: '35%', left: '25%' }]} />
          <View style={[styles.block, { top: '50%', left: '45%' }]} />
          <View style={[styles.block, { top: '60%', left: '20%' }]} />
          <View style={[styles.block, { top: '40%', left: '65%' }]} />
          <View style={[styles.block, { top: '55%', left: '70%' }]} />
          <View style={[styles.block, { top: '70%', left: '55%' }]} />
        </View>

        {/* Property Pins */}
        {LISTINGS.map((listing) => {
          const pin = MAP_PINS[listing.id];
          if (!pin) return null;
          const isSelected = selectedId === listing.id;

          return (
            <TouchableOpacity
              key={listing.id}
              style={[
                styles.pin,
                {
                  left: `${pin.x * 100}%`,
                  top: `${pin.y * 100}%`,
                  transform: [{ scale: isSelected ? 1.3 : 1 }],
                  zIndex: isSelected ? 100 : 10,
                },
              ]}
              onPress={() => handlePinPress(listing.id)}
              activeOpacity={0.7}
              accessibilityLabel={`View ${listing.name}`}
            >
              <View style={[styles.pinBubble, isSelected && styles.pinBubbleSelected]}>
                <Text style={[styles.pinPrice, isSelected && styles.pinPriceSelected]}>
                  {listing.price}
                </Text>
              </View>
              <View style={[styles.pinArrow, isSelected && styles.pinArrowSelected]} />
            </TouchableOpacity>
          );
        })}

        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
          <TouchableOpacity
            style={[styles.backBtn, { backgroundColor: colors.surface }]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            accessibilityLabel="Go back"
          >
            <Icon name={IconName.ArrowLeft} size={20} color={colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>

          <View style={[styles.headerCenter, { backgroundColor: colors.surface }]}>
            <Icon name={IconName.MapPin} size={16} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Mumbai</Text>
          </View>

          <TouchableOpacity
            style={[styles.backBtn, { backgroundColor: colors.surface }]}
            activeOpacity={0.7}
            accessibilityLabel="Map settings"
          >
            <Icon name={IconName.SlidersHorizontal} size={18} color={colors.textPrimary} strokeWidth={1.8} />
          </TouchableOpacity>
        </View>

        {/* Map Legend */}
        <View style={[styles.legend, { backgroundColor: colors.surface }]}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.primaryGold }]} />
            <Text style={[styles.legendText, { color: colors.textSecondary }]}>Selected</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.olive }]} />
            <Text style={[styles.legendText, { color: colors.textSecondary }]}>Available</Text>
          </View>
        </View>
      </View>

      {/* Bottom Sheet - Property Preview */}
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            paddingBottom: Math.max(insets.bottom, Spacing.lg),
            transform: [{ translateY: sheetTranslateY }],
            backgroundColor: colors.surface,
          },
        ]}
      >
        {selected ? (
          <>
            <View style={[styles.sheetHandle, { backgroundColor: colors.mutedFaint }]} />
            <View style={styles.sheetContent}>
              <Image source={{ uri: selected.image }} style={styles.sheetImage} />
              <View style={styles.sheetInfo}>
                <View style={styles.sheetHeader}>
                  <View style={styles.sheetTitleRow}>
                    <Text style={[styles.sheetName, { color: colors.textPrimary }]} numberOfLines={1}>{selected.name}</Text>
                    <View style={[styles.sheetBadge, { backgroundColor: colors.citron }]}>
                      <Icon name={IconName.Star} size={10} color={colors.primaryGold} strokeWidth={2} />
                      <Text style={[styles.sheetMatch, { color: colors.textPrimary }]}>{selected.match}%</Text>
                    </View>
                  </View>
                  <Text style={[styles.sheetType, { color: colors.textSecondary }]}>{selected.type} · Up to {selected.guests} guests</Text>
                </View>

                <View style={styles.sheetActions}>
                  <TouchableOpacity
                    style={[styles.sheetSaveBtn, { borderColor: colors.borderStrong }]}
                    onPress={handleSave}
                    activeOpacity={0.7}
                  >
                    <Icon name={IconName.Heart} size={16} color={colors.primary} strokeWidth={1.8} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.sheetDetailBtn, { backgroundColor: colors.primary }]}
                    onPress={() => {
                      hapticMedium();
                      navigation.navigate('PropertyDetails', { listing: selected });
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.sheetDetailText, { color: colors.white }]}>View Details</Text>
                    <Icon name={IconName.ChevronRight} size={16} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={[styles.sheetHandle, { backgroundColor: colors.mutedFaint }]} />
            <View style={styles.sheetEmpty}>
              <Icon name={IconName.MapPin} size={24} color={colors.mutedFaint} />
              <Text style={[styles.sheetEmptyText, { color: colors.textSecondary }]}>Tap a pin to view property details</Text>
            </View>
          </>
        )}
      </Animated.View>

      <Toast
        message={toast.message}
        visible={toast.visible}
        variant="success"
        onDismiss={() => setToast({ visible: false, message: '' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapArea: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  mapBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#E8E4DC',
  },
  waterArea: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '35%',
    height: '45%',
    backgroundColor: '#C5D5E4',
    borderBottomLeftRadius: 80,
  },
  waterArea2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '25%',
    height: '30%',
    backgroundColor: '#C5D5E4',
    borderTopRightRadius: 60,
  },
  road: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  roadH1: { top: '25%', left: 0, right: 0, height: 2 },
  roadH2: { top: '50%', left: 0, right: 0, height: 3 },
  roadH3: { top: '75%', left: 0, right: 0, height: 2 },
  roadV1: { left: '25%', top: 0, bottom: 0, width: 2 },
  roadV2: { left: '50%', top: 0, bottom: 0, width: 3 },
  roadV3: { left: '75%', top: 0, bottom: 0, width: 2 },
  park: {
    position: 'absolute',
    top: '15%',
    left: '40%',
    width: 60,
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(139,195,74,0.3)',
  },
  park2: {
    position: 'absolute',
    top: '60%',
    left: '60%',
    width: 45,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(139,195,74,0.25)',
  },
  block: {
    position: 'absolute',
    width: 30,
    height: 25,
    borderRadius: 4,
    backgroundColor: 'rgba(200,200,200,0.4)',
  },

  // Pins
  pin: {
    position: 'absolute',
    alignItems: 'center',
    marginLeft: -20,
    marginTop: -40,
  },
  pinBubble: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    ...Shadows.sm,
  },
  pinBubbleSelected: {
  },
  pinPrice: {
    ...Typography.captionSmall,
    fontWeight: '700',
  },
  pinPriceSelected: {
  },
  pinArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },
  pinArrowSelected: {
  },

  // Header
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    ...Shadows.sm,
  },
  headerTitle: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },

  // Legend
  legend: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: Spacing.lg,
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    ...Shadows.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    ...Typography.captionSmall,
  },

  // Bottom Sheet
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    ...Shadows.xl,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  sheetContent: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  sheetImage: {
    width: 80,
    height: 80,
    borderRadius: Radius.md,
  },
  sheetInfo: {
    flex: 1,
    gap: Spacing.sm,
  },
  sheetHeader: {
    gap: 4,
  },
  sheetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sheetName: {
    ...Typography.body,
    fontWeight: '600',
    flex: 1,
  },
  sheetBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  sheetMatch: {
    ...Typography.captionSmall,
    fontWeight: '700',
  },
  sheetType: {
    ...Typography.caption,
  },
  sheetActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  sheetSaveBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetDetailBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
  },
  sheetDetailText: {
    ...Typography.buttonSmall,
  },

  // Empty state
  sheetEmpty: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  sheetEmptyText: {
    ...Typography.bodySmall,
  },
});
