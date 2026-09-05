import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, Typography } from '../theme/colors';
import { Icon, IconName } from '../components/Icon';
import { Skeleton, SkeletonCard, SkeletonExploreCard } from '../components/Skeleton';
import { Toast } from '../components/Toast';
import { hapticLight, hapticMedium, hapticSelection } from '../utils/haptics';
import { LISTINGS } from '../data/listings';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

type IntroScreenProps = { navigation: any };

const CATEGORIES = [
  {
    id: 'gallery',
    title: 'Gallery View',
    subtitle: '12 curated picks',
    description: 'Browse through photo-forward card stacks with map integration',
    image: LISTINGS[0].image,
    tag: 'Popular',
    color: Colors.primary,
    screen: 'V1Gallery',
  },
  {
    id: 'scan',
    title: 'Scan & Save',
    subtitle: 'Swipe to explore',
    description: 'Filter by property type and swipe to save your favorites',
    image: LISTINGS[1].image,
    tag: 'New',
    color: Colors.gradientMid,
    screen: 'V2ScanSave',
  },
  {
    id: 'compare',
    title: 'Compare',
    subtitle: 'Find your match',
    description: 'See detailed comparisons with match scores and walk ratings',
    image: LISTINGS[2].image,
    tag: 'Smart',
    color: Colors.gradientEnd,
    screen: 'V3ImageLed',
  },
];

const QUICK_ACTIONS = [
  { icon: IconName.Building2, label: 'Hotels', count: '120+' },
  { icon: IconName.Home, label: 'Homes', count: '85+' },
  { icon: IconName.TreePine, label: 'Nature', count: '45+' },
  { icon: IconName.Waves, label: 'Beach', count: '60+' },
];

const TAB_ITEMS = [
  { icon: IconName.Home, label: 'Home' },
  { icon: IconName.Search, label: 'Search' },
  { icon: IconName.Heart, label: 'Saved' },
  { icon: IconName.Plane, label: 'Trips' },
  { icon: IconName.User, label: 'Profile' },
];

export default function IntroScreen({ navigation }: IntroScreenProps) {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeCard, setActiveCard] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [toast, setToast] = useState({ visible: false, message: '' });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message: string) => {
    hapticMedium();
    setToast({ visible: true, message });
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.statusBarBg, { opacity: headerOpacity }]} />

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <Image
            source={{ uri: LISTINGS[0].image }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />

          <View style={styles.heroContent}>
            <View style={styles.heroTop}>
              <View style={styles.locationBadge}>
                <Icon name={IconName.MapPin} size={13} color={Colors.white} strokeWidth={2} />
                <Text style={styles.locationText}>San Francisco</Text>
              </View>
              <TouchableOpacity
                style={styles.profileBtn}
                activeOpacity={0.7}
                onPress={() => showToast('Profile coming soon')}
                accessibilityLabel="Open profile"
                accessibilityRole="button"
              >
                <Icon name={IconName.User} size={16} color={Colors.white} strokeWidth={1.8} />
              </TouchableOpacity>
            </View>

            <View style={styles.heroCenter}>
              <Text style={styles.greeting}>Good Evening</Text>
              <Text style={styles.heroTitle}>Find Your Perfect Stay</Text>
              <Text style={styles.heroSub}>12 handpicked places in San Francisco</Text>
            </View>

            {/* Search Bar */}
            <TouchableOpacity
              style={styles.searchBar}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('V2ScanSave')}
              accessibilityLabel="Search properties in San Francisco"
              accessibilityRole="button"
            >
              <Icon name={IconName.Search} size={18} color={Colors.muted} strokeWidth={1.8} />
              <View style={styles.searchTextCol}>
                <Text style={styles.searchTitle}>San Francisco, CA</Text>
                <Text style={styles.searchSub}>Jun 15–22 · 2 guests</Text>
              </View>
              <View style={styles.searchFilter}>
                <Icon name={IconName.SlidersHorizontal} size={14} color={Colors.black} strokeWidth={1.8} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.label}
              style={styles.quickAction}
              activeOpacity={0.7}
              onPress={() => {
                hapticLight();
                navigation.navigate('V2ScanSave');
              }}
              accessibilityLabel={`Browse ${action.label} properties`}
              accessibilityRole="button"
            >
              <View style={styles.quickActionIcon}>
                <Icon name={action.icon} size={22} color={Colors.primary} strokeWidth={1.6} />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Explore Styles Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTag}>EXPLORE</Text>
              <Text style={styles.sectionTitle}>Choose Your Style</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('V1Gallery')}
              style={styles.seeAllBtn}
              accessibilityLabel="See all explore styles"
              accessibilityRole="button"
            >
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
            snapToInterval={SCREEN_W * 0.75 + 16}
            decelerationRate="fast"
            onMomentumScrollEnd={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / (SCREEN_W * 0.75 + 16)
              );
              setActiveCard(index);
              hapticSelection();
            }}
          >
            {!loaded ? (
              <>
                <SkeletonExploreCard />
                <SkeletonExploreCard />
                <SkeletonExploreCard />
              </>
            ) : (
              CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.exploreCard, { backgroundColor: cat.color }]}
                  activeOpacity={0.9}
                  onPress={() => {
                    hapticLight();
                    navigation.navigate(cat.screen);
                  }}
                >
                  <Image
                    source={{ uri: cat.image }}
                    style={styles.exploreCardImage}
                  />
                  <View style={styles.exploreCardOverlay} />
                  <View style={styles.exploreCardContent}>
                    <View style={styles.exploreTagBadge}>
                      <Text style={styles.exploreTagText}>{cat.tag}</Text>
                    </View>
                    <View style={styles.exploreCardBottom}>
                      <Text style={styles.exploreCardTitle}>{cat.title}</Text>
                      <Text style={styles.exploreCardSub}>{cat.subtitle}</Text>
                      <Text style={styles.exploreCardDesc} numberOfLines={2}>
                        {cat.description}
                      </Text>
                      <View style={styles.exploreCardAction}>
                        <Text style={styles.exploreCardActionText}>Explore</Text>
                        <Icon name={IconName.ChevronRight} size={14} color={Colors.white} strokeWidth={2} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {CATEGORIES.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === activeCard && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        {/* Featured Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTag}>FEATURED</Text>
              <Text style={styles.sectionTitle}>Top Picks For You</Text>
            </View>
          </View>

          <View style={styles.featuredGrid}>
            {!loaded ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              LISTINGS.slice(0, 4).map((listing) => (
                <TouchableOpacity
                  key={listing.id}
                  style={styles.featuredCard}
                  activeOpacity={0.85}
                  onPress={() => {
                    hapticLight();
                    navigation.navigate('PropertyDetails', { listing, listingId: listing.id });
                  }}
                >
                  <Image
                    source={{ uri: listing.image }}
                    style={styles.featuredImage}
                  />
                  <View style={styles.featuredOverlay} />
                  <View style={styles.featuredBadge}>
                    <Icon name={IconName.Star} size={10} color={Colors.primaryGold} strokeWidth={2.2} />
                    <Text style={styles.featuredMatch}>{listing.match}%</Text>
                  </View>
                  <View style={styles.featuredInfo}>
                    <Text style={styles.featuredName} numberOfLines={1}>
                      {listing.name}
                    </Text>
                    <Text style={styles.featuredPrice}>{listing.price} · {listing.type}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      {/* Bottom Tab Bar */}
      <View style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
        {TAB_ITEMS.map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <TouchableOpacity
              key={tab.label}
              style={styles.tabItem}
              activeOpacity={0.6}
              onPress={() => {
                hapticLight();
                setActiveTab(tab.label);
                if (tab.label === 'Search') {
                  navigation.navigate('V2ScanSave');
                } else if (tab.label === 'Saved') {
                  showToast('Saved list coming soon');
                } else if (tab.label === 'Trips') {
                  showToast('Trips coming soon');
                } else if (tab.label === 'Profile') {
                  showToast('Profile coming soon');
                }
              }}
              accessibilityLabel={tab.label}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Icon
                name={tab.icon}
                size={22}
                color={isActive ? Colors.primaryGold : Colors.mutedFaint}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.tabDot} />}
            </TouchableOpacity>
          );
        })}
      </View>

      <Toast
        message={toast.message}
        visible={toast.visible}
        variant="info"
        onDismiss={() => setToast({ visible: false, message: '' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  statusBarBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 54 : StatusBar.currentHeight || 24,
    backgroundColor: Colors.primary,
    zIndex: 100,
  },
  scrollContent: {
    paddingBottom: 0,
  },

  // Hero
  hero: {
    height: SCREEN_H * 0.48,
    position: 'relative',
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.overlay,
  },
  heroContent: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    justifyContent: 'space-between',
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    gap: 6,
  },
  locationText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 13,
    color: Colors.white,
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCenter: {
    gap: 6,
  },
  greeting: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  heroTitle: {
    fontFamily: 'Georgia',
    fontSize: 28,
    color: Colors.white,
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  heroSub: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  searchTextCol: {
    flex: 1,
    gap: 2,
  },
  searchTitle: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
    color: Colors.black,
  },
  searchSub: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    color: Colors.muted,
  },
  searchFilter: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
  },
  quickAction: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: Radius.lg,
    backgroundColor: Colors.cardWhite,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionLabel: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 11,
    color: Colors.black,
  },

  // Section
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  sectionTag: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 10,
    color: Colors.primaryGold,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: 'Georgia',
    fontSize: 20,
    color: Colors.black,
    letterSpacing: -0.5,
  },
  seeAllBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  seeAll: {
    ...Typography.bodySmall,
    fontWeight: '500',
    color: Colors.primaryGold,
  },

  // Explore Cards
  cardsContainer: {
    paddingLeft: Spacing.xl,
    paddingRight: Spacing.lg,
    gap: 16,
  },
  exploreCard: {
    width: SCREEN_W * 0.75,
    height: 320,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  exploreCardImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  exploreCardOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  exploreCardContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Spacing.xl,
  },
  exploreTagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  exploreTagText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 11,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  exploreCardBottom: {
    gap: 4,
  },
  exploreCardTitle: {
    fontFamily: 'Georgia',
    fontSize: 22,
    color: Colors.white,
    letterSpacing: -0.5,
  },
  exploreCardSub: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  exploreCardDesc: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 17,
    marginTop: 4,
  },
  exploreCardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.md,
  },
  exploreCardActionText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 13,
    color: Colors.white,
  },

  // Pagination
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: Spacing.lg,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.mutedFaint,
  },
  dotActive: {
    width: 20,
    backgroundColor: Colors.primaryGold,
  },

  // Featured Grid
  featuredGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  featuredCard: {
    width: (SCREEN_W - 52) / 2,
    height: 180,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  featuredBadge: {
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
  featuredMatch: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 12,
    color: Colors.white,
  },
  featuredInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  featuredName: {
    fontFamily: 'Georgia',
    fontSize: 14,
    color: Colors.white,
    lineHeight: 18,
  },
  featuredPrice: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },

  // Tab Bar
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.cardWhite,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 52,
    minHeight: 48,
    paddingVertical: Spacing.xs,
    gap: 3,
  },
  tabLabel: {
    ...Typography.captionSmall,
    color: Colors.muted,
    fontWeight: '400',
  },
  tabLabelActive: {
    color: Colors.primaryGold,
    fontWeight: '600',
  },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primaryGold,
    marginTop: 2,
  },
});
