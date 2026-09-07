import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Spacing, Radius, Typography, Shadows } from '../theme/ThemeContext';
import { Icon, IconName } from '../components/Icon';
import { hapticLight } from '../utils/haptics';

const TRIPS = [
  {
    id: 't1',
    destination: 'San Francisco',
    dates: 'Mar 15 – Mar 22, 2025',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1400&q=90&auto=format&fit=crop',
    places: 3,
    nights: 7,
    budget: '$2,400',
  },
  {
    id: 't2',
    destination: 'Big Sur',
    dates: 'Feb 8 – Feb 10, 2025',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1400&q=90&auto=format&fit=crop',
    places: 1,
    nights: 2,
    budget: '$580',
  },
  {
    id: 't3',
    destination: 'Napa Valley',
    dates: 'Jan 20 – Jan 23, 2025',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1506377585622-bedcbb2f40a9?w=1400&q=90&auto=format&fit=crop',
    places: 2,
    nights: 3,
    budget: '$1,120',
  },
];

const UP_COMING = TRIPS.filter((t) => t.status === 'upcoming');
const PAST = TRIPS.filter((t) => t.status === 'completed');

export default function TripsScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Trips</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {UP_COMING.length} upcoming · {PAST.length} past
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Upcoming section */}
        {UP_COMING.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Upcoming</Text>
            {UP_COMING.map((trip) => (
              <TouchableOpacity
                key={trip.id}
                style={[styles.tripCard, { backgroundColor: colors.cardWhite }]}
                activeOpacity={0.85}
                onPress={() => hapticLight()}
              >
                <Image source={{ uri: trip.image }} style={styles.tripImage} />
                <View style={styles.tripOverlay} />
                <View style={styles.tripBadge}>
                  <Icon name={IconName.Plane} size={12} color={colors.white} strokeWidth={2} />
                  <Text style={styles.tripBadgeText}>Upcoming</Text>
                </View>
                <View style={styles.tripBottom}>
                  <Text style={styles.tripDest}>{trip.destination}</Text>
                  <Text style={styles.tripDates}>{trip.dates}</Text>
                  <View style={styles.tripStats}>
                    <View style={styles.tripStat}>
                      <Icon name={IconName.Home} size={12} color="rgba(255,255,255,0.8)" strokeWidth={2} />
                      <Text style={styles.tripStatText}>{trip.places} places</Text>
                    </View>
                    <View style={styles.tripStat}>
                      <Icon name={IconName.Calendar} size={12} color="rgba(255,255,255,0.8)" strokeWidth={2} />
                      <Text style={styles.tripStatText}>{trip.nights} nights</Text>
                    </View>
                    <View style={styles.tripStat}>
                      <Icon name={IconName.DollarSign} size={12} color="rgba(255,255,255,0.8)" strokeWidth={2} />
                      <Text style={styles.tripStatText}>{trip.budget}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Past trips section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Past Trips</Text>
          {PAST.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              style={[styles.pastCard, { backgroundColor: colors.cardWhite }]}
              activeOpacity={0.85}
              onPress={() => hapticLight()}
            >
              <Image source={{ uri: trip.image }} style={styles.pastImage} />
              <View style={styles.pastInfo}>
                <Text style={[styles.pastDest, { color: colors.textPrimary }]}>{trip.destination}</Text>
                <Text style={[styles.pastDates, { color: colors.textSecondary }]}>{trip.dates}</Text>
                <View style={styles.pastStats}>
                  <Text style={[styles.pastStat, { color: colors.textTertiary }]}>
                    {trip.places} places · {trip.nights} nights · {trip.budget}
                  </Text>
                </View>
              </View>
              <View style={styles.pastCheck}>
                <View style={[styles.checkCircle, { backgroundColor: colors.success }]}>
                  <Icon name={IconName.Check} size={14} color={colors.white} strokeWidth={2.5} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* AI Trip Card */}
        <View style={[styles.aiCard, { backgroundColor: colors.primary }]}>
          <Icon name={IconName.Sparkles} size={24} color={colors.white} strokeWidth={2} />
          <View style={styles.aiContent}>
            <Text style={styles.aiTitle}>Plan a new trip</Text>
            <Text style={styles.aiDesc}>
              Let AI create your perfect itinerary in seconds.
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.aiBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
            onPress={() => {
              hapticLight();
              navigation.navigate('AIGeneration');
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.aiBtnText}>Create</Text>
            <Icon name={IconName.ArrowRight} size={16} color={colors.white} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  section: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    ...Typography.label,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: Spacing.md,
    color: '#94A3B8',
  },
  tripCard: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    height: 240,
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  tripImage: {
    width: '100%',
    height: '100%',
  },
  tripOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  tripBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99,102,241,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 5,
  },
  tripBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  tripBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
  },
  tripDest: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: "'Georgia', serif",
  },
  tripDates: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginTop: 2,
  },
  tripStats: {
    flexDirection: 'row',
    gap: 14,
    marginTop: Spacing.md,
  },
  tripStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  tripStatText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '500',
  },
  pastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.md,
    ...Shadows.xs,
  },
  pastImage: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
  },
  pastInfo: {
    flex: 1,
  },
  pastDest: {
    ...Typography.body,
    fontWeight: '600',
  },
  pastDates: {
    ...Typography.caption,
    marginTop: 2,
  },
  pastStats: {
    marginTop: 4,
  },
  pastStat: {
    ...Typography.captionSmall,
  },
  pastCheck: {},
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiCard: {
    marginHorizontal: Spacing.xl,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    ...Shadows.md,
  },
  aiContent: {
    flex: 1,
  },
  aiTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  aiDesc: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  aiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
    gap: 4,
  },
  aiBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
