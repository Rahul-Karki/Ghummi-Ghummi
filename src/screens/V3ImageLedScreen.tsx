import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Alert,
  RefreshControl,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import StatusBar from '../components/StatusBar';
import TopBar from '../components/TopBar';
import BottomMenu from '../components/BottomMenu';
import YMark from '../components/YMark';
import { MatchPill } from '../components/Pill';
import { Toast } from '../components/Toast';
import { Icon, IconName } from '../components/Icon';
import { hapticLight, hapticMedium, hapticSuccess } from '../utils/haptics';

const HERO_HEIGHT = 758;
const COL_WIDTH = 58;
const COL_GAP = 7;

const COMPARE_DATA = {
  thumbnails: [
    { id: 't1', selected: true },
    { id: 't2', selected: false },
    { id: 't3', selected: false },
  ],
  match: ['91%', '85%', '81%'],
  price: ['$146', '$132', '$120'],
  style: ['Boutique', 'Coastal', 'Classic'],
  location: ['0.3 km', '1.2 km', '2 km'],
  reviews: ['4.91', '4.78', '4.65'],
};

const WHY_MATCHED_ICONS = [
  IconName.Compass,
  IconName.Utensils,
  IconName.Clock,
];

const WHY_MATCHED = [
  {
    title: 'Walkable to your saved spots',
    sub: '4 of your wishlist places within 800m',
  },
  {
    title: 'Food scene fits your trips',
    sub: 'Matches where you ate in Lisbon & Rome',
  },
  {
    title: 'Quiet area, like your last 3 stays',
    sub: 'Residential street, low night noise',
  },
];

export default function V3ImageLedScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    hapticLight();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBg }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => setRefreshing(false), 800);
            }}
            tintColor={colors.primaryGold}
            colors={[colors.primaryGold]}
          />
        }
      >
        <Hero onBack={() => navigation.goBack()} />
        <CompareAlternatives />
        <WhyMatchedSection />
        <PriceAndReserve />
      </ScrollView>
      <BottomMenu navigation={navigation} />
    </View>
  );
}

function Hero({ onBack }: { onBack: () => void }) {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1.06)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [countWalk, setCountWalk] = useState(0);
  const [countFood, setCountFood] = useState(0);
  const [countActivity, setCountActivity] = useState(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 550,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 550,
        useNativeDriver: true,
      }),
    ]).start();

    animateCount(setCountWalk, 91, 900, 850);
    animateCount(setCountFood, 91, 900, 1000);
    animateCount(setCountActivity, 91, 900, 1150);
  }, []);

  return (
    <View style={[styles.heroContainer, { backgroundColor: colors.background }]}>
      <Animated.View
        style={[
          styles.heroImageContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <Image
          source={{ uri: 'https://picsum.photos/seed/cozy-den/800/1600' }}
          style={styles.heroImage}
        />
      </Animated.View>
      <View style={styles.heroGradient} />
      <StatusBar light />

      <View style={styles.heroContent}>
        <TopBar light onBack={onBack} />
        <View style={styles.heroDivider} />
        <View style={styles.heroCenter}>
          <YMark light />
          <Text style={[styles.heroTitle, { color: colors.white }]}>Your perfect place</Text>
          <Text style={[styles.heroSub, { color: colors.white }]}>Barcelona · Jun 15-22 · 2 guests</Text>
        </View>
      </View>

      <View style={styles.heroBottom}>
        <View style={styles.heroBottomCenter}>
          <View style={styles.heroPin}>
            <Icon name={IconName.MapPin} size={22} color="#CFD205" />
          </View>
          <Text style={[styles.heroPlaceName, { color: colors.white }]}>Cozy Den</Text>
        </View>

        <View style={styles.heroStatsContainer}>
          <View style={styles.heroDividerLight} />
          <View style={styles.heroStatsRow}>
            <Ring label="Walk" value={countWalk} />
            <Ring label="Food" value={countFood} />
            <Ring label="Activity" value={countActivity} />
          </View>
          <View style={styles.heroDividerThin} />
        </View>
      </View>
    </View>
  );
}

function animateCount(setter: (v: number) => void, target: number, duration: number, delay: number) {
  const start = Date.now() + delay;
  const step = () => {
    const elapsed = Date.now() - start;
    if (elapsed < 0) {
      requestAnimationFrame(step);
      return;
    }
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    setter(Math.round(eased * target));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function Ring({ label, value }: { label: string; value: number }) {
  const { colors } = useTheme();
  return (
    <View style={styles.ringContainer}>
      <View style={[styles.ringCircle, { borderColor: colors.citron }]}>
        <Text style={[styles.ringValue, { color: colors.white }]}>{value}%</Text>
      </View>
      <Text style={[styles.ringLabel, { color: colors.white }]}>{label}</Text>
    </View>
  );
}

function CompareAlternatives() {
  const { colors } = useTheme();
  const colsWidth = COL_WIDTH * 3 + COL_GAP * 2;

  return (
    <View style={styles.compareContainer}>
      <View style={styles.compareHeader}>
        <Text style={[styles.compareTitle, { color: colors.textPrimary }]}>Compare Alternatives</Text>
        <Text style={[styles.compareCount, { color: colors.muted }]}>3/12</Text>
      </View>

      <View style={styles.compareTable}>
        <CompareRow
          label=""
          values={COMPARE_DATA.thumbnails.map((t) => (
            <View
              key={t.id}
              style={[
                styles.compareThumb,
                t.selected && { borderWidth: 2, borderColor: colors.pin, borderRadius: 6.023 },
              ]}
            >
              <Image
                source={{ uri: `https://picsum.photos/seed/${t.id}/120/120` }}
                style={styles.compareThumbImg}
              />
            </View>
          ))}
        />
        <CompareRow
          label="Match"
          values={COMPARE_DATA.match.map((v, i) =>
            i === 0 ? <MatchPill key={i}>{v}</MatchPill> : <Text key={i} style={[styles.compareValue, { color: colors.textPrimary }]}>{v}</Text>
          )}
        />
        <CompareRow
          label="Price"
          values={COMPARE_DATA.price.map((v, i) => (
            <Text key={i} style={[styles.compareValue, { color: colors.textPrimary }]}>{v}</Text>
          ))}
        />
        <CompareRow
          label="Style"
          values={COMPARE_DATA.style.map((v, i) => (
            <Text key={i} style={[styles.compareValue, { color: colors.textPrimary }]}>{v}</Text>
          ))}
        />
        <CompareRow
          label="Location"
          values={COMPARE_DATA.location.map((v, i) => (
            <Text key={i} style={[styles.compareValue, { color: colors.textPrimary }]}>{v}</Text>
          ))}
        />
        <CompareRow
          label="Reviews"
          values={COMPARE_DATA.reviews.map((v, i) => (
            <View key={i} style={styles.reviewRow}>
              <Icon name={IconName.Star} size={8} color={colors.textPrimary} />
              <Text style={[styles.compareValue, { color: colors.textPrimary }]}>{v}</Text>
            </View>
          ))}
        />
      </View>
    </View>
  );
}

function CompareRow({
  label,
  values,
}: {
  label: string;
  values: React.ReactNode[];
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.compareRowContainer}>
      <Text style={[styles.compareRowLabel, { color: colors.textPrimary }]}>{label}</Text>
      <View style={styles.compareRowValues}>
        {values.map((v, i) => (
          <View key={i} style={styles.compareCol}>
            {v}
          </View>
        ))}
      </View>
      <View style={styles.compareDivider} />
    </View>
  );
}

function WhyMatchedSection() {
  const { colors } = useTheme();
  return (
    <View style={styles.whyContainer}>
      <Text style={[styles.whyTitle, { color: colors.textPrimary }]}>Why we matched you</Text>
      {WHY_MATCHED.map((item, i) => (
        <View key={i}>
          <View style={styles.whyRow}>
            <Icon name={WHY_MATCHED_ICONS[i]} size={14} color={colors.textPrimary} />
            <View style={styles.whyTextCol}>
              <Text style={[styles.whyItemTitle, { color: colors.textPrimary }]}>{item.title}</Text>
              <Text style={[styles.whyItemSub, { color: colors.textSecondary }]}>{item.sub}</Text>
            </View>
          </View>
          {i < WHY_MATCHED.length - 1 && <View style={styles.whyDivider} />}
        </View>
      ))}
    </View>
  );
}

function PriceAndReserve() {
  const { colors } = useTheme();
  const [toast, setToast] = useState({ visible: false, message: '' });

  const handleReserve = () => {
    hapticMedium();
    Alert.alert(
      'Reserve Cozy Den',
      'Book this boutique stay for 7 nights?\n\nPrice: $146/night\nTotal: $1,022',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Booking',
          onPress: () => {
            hapticSuccess();
            setToast({ visible: true, message: 'Booking confirmed! Check your trips.' });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.priceContainer}>
      <View style={styles.priceInfo}>
        <View style={styles.priceRow}>
        <Text style={[styles.priceAmount, { color: colors.textPrimary }]}>$146</Text>
          <Text style={[styles.pricePerNight, { color: colors.muted }]}>/night</Text>
        </View>
        <Text style={[styles.priceTotal, { color: colors.muted }]}>$1,022 · 7 nights</Text>
      </View>
      <TouchableOpacity
        style={styles.reserveButton}
        activeOpacity={0.8}
        onPress={handleReserve}
        accessibilityLabel="Reserve this property"
        accessibilityRole="button"
      >
        <Text style={[styles.reserveText, { color: colors.textInverse }]}>Reserve</Text>
      </TouchableOpacity>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroContainer: {
    height: HERO_HEIGHT,
    overflow: 'hidden',
  },
  heroImageContainer: {
    ...StyleSheet.absoluteFill,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  heroContent: {
    flex: 1,
  },
  heroCenter: {
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 18,
  },
  heroSub: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    opacity: 0.9,
  },
  heroDivider: {
    height: 0.75,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  heroBottom: {
    position: 'absolute',
    bottom: 0,
    left: 37,
    right: 37,
    gap: 30,
    alignItems: 'center',
  },
  heroBottomCenter: {
    alignItems: 'center',
    gap: 12,
  },
  heroPin: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPlaceName: {
    fontFamily: 'Inter',
    fontSize: 30,
    lineHeight: 36,
  },
  heroStatsContainer: {
    width: '100%',
  },
  heroDividerLight: {
    height: 0.75,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 12,
  },
  heroStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroDividerThin: {
    height: 0.5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginTop: 12,
  },
  ringContainer: {
    alignItems: 'center',
    gap: 4,
  },
  ringCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringValue: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 8,
  },
  ringLabel: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 14.4,
  },
  compareContainer: {
    padding: 30,
    paddingTop: 30,
    gap: 12,
  },
  compareHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compareTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
  },
  compareCount: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 14,
    letterSpacing: 0.7,
  },
  compareTable: {
    gap: 12,
  },
  compareRowContainer: {
    minHeight: 16,
  },
  compareRowLabel: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 14.4,
    marginBottom: 4,
  },
  compareRowValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: COL_WIDTH * 3 + COL_GAP * 2,
  },
  compareCol: {
    width: COL_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compareThumb: {
    width: COL_WIDTH,
    height: 53.809,
    borderRadius: 4.023,
    overflow: 'hidden',
  },
  compareThumbImg: {
    width: '100%',
    height: '100%',
  },
  compareValue: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 14.4,
    textAlign: 'center',
  },
  compareDivider: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.15)',
    width: '100%',
    marginTop: 12,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  whyContainer: {
    padding: 30,
    paddingTop: 30,
    gap: 12,
  },
  whyTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
  },
  whyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  whyTextCol: {
    flex: 1,
    gap: 2,
  },
  whyItemTitle: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15.004,
  },
  whyItemSub: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 15.004,
  },
  whyDivider: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.15)',
    width: '100%',
    marginTop: 12,
  },
  priceContainer: {
    padding: 30,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceInfo: {
    gap: 7,
    width: 160,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  priceAmount: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 19.2,
  },
  pricePerNight: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    letterSpacing: 0.6,
    lineHeight: 14.4,
  },
  priceTotal: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    letterSpacing: 0.6,
    lineHeight: 14.4,
  },
  reserveButton: {
    width: 103,
    padding: 10,
    borderRadius: 76.802,
    borderWidth: 0.404,
    borderColor: 'rgba(189,142,60,0.4)',
    alignItems: 'center',
  },
  reserveText: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 14.4,
  },
});
