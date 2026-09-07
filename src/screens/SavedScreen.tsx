import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Spacing, Radius, Typography, Shadows } from '../theme/ThemeContext';
import { Icon, IconName } from '../components/Icon';
import { LISTINGS } from '../data/listings';
import { hapticLight } from '../utils/haptics';

const SAVED_IDS = ['oasis', 'coastal', 'mountain', 'tiny'];

export default function SavedScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [saved, setSaved] = useState(SAVED_IDS);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const savedListings = LISTINGS.filter((l) => saved.includes(l.id));

  const toggleSave = useCallback((id: string) => {
    hapticLight();
    setSaved((prev) => {
      const isRemoving = prev.includes(id);
      setToast({
        visible: true,
        message: isRemoving ? 'Removed from saved' : 'Added to saved',
      });
      return isRemoving ? prev.filter((s) => s !== id) : [...prev, id];
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Saved</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {savedListings.length} {savedListings.length === 1 ? 'place' : 'places'} saved
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {savedListings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.surfaceSubtle }]}>
              <Icon name={IconName.Bookmark} size={40} color={colors.mutedFaint} strokeWidth={1.5} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>No saved places</Text>
            <Text style={[styles.emptyDesc, { color: colors.textSecondary }]}>
              Tap the heart icon on any listing to save it here for later.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {savedListings.map((listing, i) => (
              <TouchableOpacity
                key={listing.id}
                style={[styles.card, { backgroundColor: colors.cardWhite, marginBottom: Spacing.lg }]}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('PropertyDetails', { listingId: listing.id })}
              >
                <Image source={{ uri: listing.image }} style={styles.cardImage} />
                <View style={styles.cardOverlay} />
                <View style={styles.cardTopRight}>
                  <TouchableOpacity
                    style={[styles.heartBtn, { backgroundColor: 'rgba(0,0,0,0.35)' }]}
                    onPress={() => toggleSave(listing.id)}
                    activeOpacity={0.7}
                  >
                    <Icon
                      name={IconName.Heart}
                      size={18}
                      color={saved.includes(listing.id) ? colors.error : colors.white}
                      strokeWidth={2}
                      fill={saved.includes(listing.id) ? colors.error : 'transparent'}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.cardBottom}>
                  <View style={styles.cardBadges}>
                    <View style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                      <Icon name={IconName.Star} size={10} color={colors.primaryGold} strokeWidth={2.5} />
                      <Text style={styles.badgeText}>{listing.rating}</Text>
                    </View>
                    <View style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                      <Text style={styles.badgeText}>{listing.price}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.cardName}>{listing.name}</Text>
                    <Text style={styles.cardType}>
                      {listing.type} · {listing.guests} guests
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Toast */}
      {toast.visible && (
        <View style={[styles.toast, { backgroundColor: colors.textPrimary, bottom: insets.bottom + 90 }]}>
          <Text style={[styles.toastText, { color: colors.textInverse }]}>{toast.message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    ...Typography.body,
    marginTop: 4,
  },
  scroll: { flex: 1 },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: Spacing.xxxl,
  },
  emptyIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  emptyTitle: {
    ...Typography.h3,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  emptyDesc: {
    ...Typography.body,
    textAlign: 'center',
    lineHeight: 22,
  },
  list: {
    paddingHorizontal: Spacing.xl,
  },
  card: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    height: 220,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: Radius.lg,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFill,
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  cardTopRight: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
  },
  heartBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
  },
  cardBadges: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  cardName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  cardType: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginTop: 2,
  },
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    ...Shadows.lg,
  },
  toastText: {
    ...Typography.buttonSmall,
  },
});
