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
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Spacing, Radius, Typography, Shadows } from '../theme/ThemeContext';
import { Icon, IconName } from '../components/Icon';
import { Skeleton, SkeletonCard, SkeletonExploreCard } from '../components/Skeleton';
import { Toast } from '../components/Toast';
import { hapticLight, hapticMedium, hapticSelection } from '../utils/haptics';
import { LISTINGS } from '../data/listings';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

type IntroScreenProps = { navigation: any };

const QUICK_ACTIONS = [
  { icon: IconName.Building2, label: 'Hotels', count: '120+' },
  { icon: IconName.Home, label: 'Homes', count: '85+' },
  { icon: IconName.TreePine, label: 'Nature', count: '45+' },
  { icon: IconName.Waves, label: 'Beach', count: '60+' },
];

const TAB_ITEMS = [
  { icon: IconName.Home, label: 'Home' },
  { icon: IconName.Heart, label: 'Saved' },
  { icon: IconName.Plane, label: 'Trips' },
  { icon: IconName.User, label: 'Profile' },
];

const SERVICES = [
  { icon: IconName.Building2, label: 'Hotels', count: '120+' },
  { icon: IconName.Home, label: 'Homes', count: '85+' },
  { icon: IconName.TreePine, label: 'Nature', count: '45+' },
  { icon: IconName.Waves, label: 'Beach', count: '60+' },
  { icon: IconName.Compass, label: 'Resorts', count: '30+' },
  { icon: IconName.Car, label: 'Villas', count: '25+' },
];

export default function IntroScreen({ navigation }: IntroScreenProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const CATEGORIES = [
    { id: 'gallery', title: 'Gallery View', subtitle: '12 curated picks', description: 'Browse through photo-forward card stacks with map integration', image: LISTINGS[0].image, tag: 'Popular', color: colors.primary, screen: 'V1Gallery' },
    { id: 'scan', title: 'Scan & Save', subtitle: 'Swipe to explore', description: 'Filter by property type and swipe to save your favorites', image: LISTINGS[1].image, tag: 'New', color: colors.gradientMid, screen: 'V2ScanSave' },
    { id: 'compare', title: 'Compare', subtitle: 'Find your match', description: 'See detailed comparisons with match scores and walk ratings', image: LISTINGS[2].image, tag: 'Smart', color: colors.gradientEnd, screen: 'V3ImageLed' },
  ];

  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeCard, setActiveCard] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message: string) => {
    hapticMedium();
    setToast({ visible: true, message });
  };

  const filteredServices = SERVICES.filter((s) =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.statusBarBg, { opacity: headerOpacity, backgroundColor: colors.primary }]} />

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
          <Image source={{ uri: LISTINGS[0].image }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <View style={styles.heroTop}>
              <View style={styles.locationBadge}>
                <Icon name={IconName.MapPin} size={13} color={colors.white} strokeWidth={2} />
                <Text style={[styles.locationText, { color: colors.white }]}>San Francisco</Text>
              </View>
              <TouchableOpacity style={styles.profileBtn} activeOpacity={0.7} onPress={() => navigation.navigate('Profile')} accessibilityLabel="Open profile" accessibilityRole="button">
                <Icon name={IconName.User} size={16} color={colors.white} strokeWidth={1.8} />
              </TouchableOpacity>
            </View>
            <View style={styles.heroCenter}>
              <Text style={styles.greeting}>Good Evening</Text>
              <Text style={[styles.heroTitle, { color: colors.white }]}>Find Your Perfect Stay</Text>
              <Text style={styles.heroSub}>12 handpicked places in San Francisco</Text>
            </View>
            <TouchableOpacity style={[styles.searchBar, { backgroundColor: colors.white }]} activeOpacity={0.8} onPress={() => navigation.navigate('V2ScanSave')} accessibilityLabel="Search properties in San Francisco" accessibilityRole="button">
              <Icon name={IconName.Search} size={18} color={colors.muted} strokeWidth={1.8} />
              <View style={styles.searchTextCol}>
                <Text style={[styles.searchTitle, { color: colors.black }]}>San Francisco, CA</Text>
                <Text style={[styles.searchSub, { color: colors.muted }]}>Jun 15–22 · 2 guests</Text>
              </View>
              <View style={[styles.searchFilter, { backgroundColor: colors.secondary }]}>
                <Icon name={IconName.SlidersHorizontal} size={14} color={colors.black} strokeWidth={1.8} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={[styles.searchInputContainer, { backgroundColor: colors.white, borderColor: searchFocused ? colors.primary : colors.border }, searchFocused && styles.searchInputFocused]}>
            <Icon name={IconName.Search} size={18} color={searchFocused ? colors.primary : colors.muted} strokeWidth={1.8} />
            <TextInput
              style={[styles.searchInput, { color: colors.textPrimary }]}
              placeholder="Search hotels, villas, resorts..."
              placeholderTextColor={colors.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              returnKeyType="search"
              accessibilityLabel="Search services"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => { setSearchQuery(''); hapticLight(); }} style={[styles.searchClearBtn, { backgroundColor: colors.surfaceSubtle }]}>
                <Icon name={IconName.Search} size={14} color={colors.muted} />
              </TouchableOpacity>
            )}
          </View>

          {searchQuery.length > 0 ? (
            <View style={[styles.searchResults, { backgroundColor: colors.white }]}>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <TouchableOpacity key={service.label} style={[styles.searchResultItem, { borderBottomColor: colors.border }]} onPress={() => { hapticLight(); setSearchQuery(''); setSearchFocused(false); navigation.navigate('V2ScanSave'); }} activeOpacity={0.7}>
                    <View style={[styles.searchResultIcon, { backgroundColor: colors.surfaceSubtle }]}>
                      <Icon name={service.icon} size={18} color={colors.primary} strokeWidth={1.5} />
                    </View>
                    <View style={styles.searchResultInfo}>
                      <Text style={[styles.searchResultLabel, { color: colors.textPrimary }]}>{service.label}</Text>
                      <Text style={[styles.searchResultCount, { color: colors.textSecondary }]}>{service.count} properties</Text>
                    </View>
                    <Icon name={IconName.ChevronRight} size={16} color={colors.muted} />
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.searchNoResults}>
                  <Icon name={IconName.Search} size={32} color={colors.mutedFaint} />
                  <Text style={[styles.searchNoResultsText, { color: colors.textSecondary }]}>No services found</Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.servicesGrid}>
              {SERVICES.map((service) => (
                <TouchableOpacity key={service.label} style={[styles.serviceItem, { backgroundColor: colors.white }]} activeOpacity={0.7} onPress={() => { hapticLight(); navigation.navigate('V2ScanSave'); }} accessibilityLabel={`Browse ${service.label}`} accessibilityRole="button">
                  <View style={[styles.serviceIconContainer, { backgroundColor: colors.secondary }]}>
                    <Icon name={service.icon} size={22} color={colors.primary} strokeWidth={1.5} />
                  </View>
                  <Text style={[styles.serviceLabel, { color: colors.textPrimary }]}>{service.label}</Text>
                  <Text style={[styles.serviceCount, { color: colors.textSecondary }]}>{service.count}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Explore Styles Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTag, { color: colors.primaryGold }]}>EXPLORE</Text>
              <Text style={[styles.sectionTitle, { color: colors.black }]}>Choose Your Style</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('V1Gallery')} style={styles.seeAllBtn} accessibilityLabel="See all explore styles" accessibilityRole="button">
              <Text style={[styles.seeAll, { color: colors.primaryGold }]}>See All →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsContainer} snapToInterval={SCREEN_W * 0.75 + 16} decelerationRate="fast" onMomentumScrollEnd={(e) => { const index = Math.round(e.nativeEvent.contentOffset.x / (SCREEN_W * 0.75 + 16)); setActiveCard(index); hapticSelection(); }}>
            {!loaded ? (
              <><SkeletonExploreCard /><SkeletonExploreCard /><SkeletonExploreCard /></>
            ) : (
              CATEGORIES.map((cat) => (
                <TouchableOpacity key={cat.id} style={[styles.exploreCard, { backgroundColor: cat.color }]} activeOpacity={0.9} onPress={() => { hapticLight(); navigation.navigate(cat.screen); }}>
                  <Image source={{ uri: cat.image }} style={styles.exploreCardImage} />
                  <View style={styles.exploreCardOverlay} />
                  <View style={styles.exploreCardContent}>
                    <View style={styles.exploreTagBadge}>
                      <Text style={[styles.exploreTagText, { color: colors.white }]}>{cat.tag}</Text>
                    </View>
                    <View style={styles.exploreCardBottom}>
                      <Text style={[styles.exploreCardTitle, { color: colors.white }]}>{cat.title}</Text>
                      <Text style={styles.exploreCardSub}>{cat.subtitle}</Text>
                      <Text style={styles.exploreCardDesc} numberOfLines={2}>{cat.description}</Text>
                      <View style={styles.exploreCardAction}>
                        <Text style={[styles.exploreCardActionText, { color: colors.white }]}>Explore</Text>
                        <Icon name={IconName.ChevronRight} size={14} color={colors.white} strokeWidth={2} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
          <View style={styles.pagination}>
            {CATEGORIES.map((_, i) => (
              <View key={i} style={[styles.dot, { backgroundColor: colors.mutedFaint }, i === activeCard && [styles.dotActive, { backgroundColor: colors.primaryGold }]]} />
            ))}
          </View>
        </View>

        {/* Featured Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTag, { color: colors.primaryGold }]}>FEATURED</Text>
              <Text style={[styles.sectionTitle, { color: colors.black }]}>Top Picks For You</Text>
            </View>
          </View>
          <View style={styles.featuredGrid}>
            {!loaded ? (
              <><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
            ) : (
              LISTINGS.slice(0, 4).map((listing) => (
                <TouchableOpacity key={listing.id} style={styles.featuredCard} activeOpacity={0.85} onPress={() => { hapticLight(); navigation.navigate('PropertyDetails', { listing, listingId: listing.id }); }}>
                  <Image source={{ uri: listing.image }} style={styles.featuredImage} />
                  <View style={styles.featuredOverlay} />
                  <View style={styles.featuredBadge}>
                    <Icon name={IconName.Star} size={10} color={colors.primaryGold} strokeWidth={2.2} />
                    <Text style={[styles.featuredMatch, { color: colors.white }]}>{listing.match}%</Text>
                  </View>
                  <View style={styles.featuredInfo}>
                    <Text style={[styles.featuredName, { color: colors.white }]} numberOfLines={1}>{listing.name}</Text>
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
      <View style={[styles.tabBarContainer, { paddingBottom: Math.max(insets.bottom, Spacing.md), backgroundColor: colors.cardWhite, borderTopColor: colors.border }]}>
        <View style={styles.tabBar}>
          {TAB_ITEMS.slice(0, 2).map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <TouchableOpacity key={tab.label} style={styles.tabItem} activeOpacity={0.6} onPress={() => { hapticLight(); setActiveTab(tab.label); if (tab.label === 'Saved') { navigation.navigate('Saved'); } }} accessibilityLabel={tab.label} accessibilityRole="button" accessibilityState={{ selected: isActive }}>
                <Icon name={tab.icon} size={20} color={isActive ? colors.primaryGold : colors.muted} strokeWidth={isActive ? 2 : 1.5} />
                <Text style={[styles.tabLabel, { color: isActive ? colors.primaryGold : colors.muted }, isActive && styles.tabLabelActive]}>{tab.label}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={[styles.mapButton, { backgroundColor: colors.primary }]} activeOpacity={0.7} onPress={() => { hapticMedium(); navigation.navigate('Map'); }} accessibilityLabel="Open Map View" accessibilityRole="button">
            <View style={[styles.mapButtonInner, { backgroundColor: colors.primaryGold }]}>
              <Icon name={IconName.MapPin} size={24} color={colors.white} strokeWidth={2} />
            </View>
          </TouchableOpacity>
          {TAB_ITEMS.slice(2).map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <TouchableOpacity key={tab.label} style={styles.tabItem} activeOpacity={0.6} onPress={() => { hapticLight(); setActiveTab(tab.label); if (tab.label === 'Trips') { navigation.navigate('Trips'); } else if (tab.label === 'Profile') { navigation.navigate('Profile'); } }} accessibilityLabel={tab.label} accessibilityRole="button" accessibilityState={{ selected: isActive }}>
                <Icon name={tab.icon} size={20} color={isActive ? colors.primaryGold : colors.muted} strokeWidth={isActive ? 2 : 1.5} />
                <Text style={[styles.tabLabel, { color: isActive ? colors.primaryGold : colors.muted }, isActive && styles.tabLabelActive]}>{tab.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Toast message={toast.message} visible={toast.visible} variant="info" onDismiss={() => setToast({ visible: false, message: '' })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  statusBarBg: { position: 'absolute', top: 0, left: 0, right: 0, height: Platform.OS === 'ios' ? 54 : StatusBar.currentHeight || 24, zIndex: 100 },
  scrollContent: { paddingBottom: 0 },
  hero: { height: SCREEN_H * 0.48, position: 'relative' },
  heroImage: { ...StyleSheet.absoluteFill, width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(15,23,42,0.35)' },
  heroContent: { flex: 1, paddingHorizontal: Spacing.xl, paddingTop: Platform.OS === 'ios' ? 60 : 40, justifyContent: 'space-between' },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: Radius.full, gap: 6 },
  locationText: { fontFamily: 'Inter', fontWeight: '500', fontSize: 13 },
  profileBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  heroCenter: { gap: 6 },
  greeting: { fontFamily: 'Inter', fontWeight: '400', fontSize: 14, color: 'rgba(255,255,255,0.85)' },
  heroTitle: { fontFamily: 'Georgia', fontSize: 28, letterSpacing: -0.8, lineHeight: 34 },
  heroSub: { fontFamily: 'Inter', fontWeight: '400', fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  searchBar: { flexDirection: 'row', alignItems: 'center', borderRadius: Radius.lg, padding: Spacing.md, gap: Spacing.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 8 },
  searchTextCol: { flex: 1, gap: 2 },
  searchTitle: { fontFamily: 'Inter', fontWeight: '600', fontSize: 14 },
  searchSub: { fontFamily: 'Inter', fontWeight: '400', fontSize: 12 },
  searchFilter: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  section: { marginBottom: Spacing.xxl },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: Spacing.xl, marginBottom: Spacing.lg },
  sectionTag: { fontFamily: 'Inter', fontWeight: '600', fontSize: 10, letterSpacing: 1.5, marginBottom: 4 },
  sectionTitle: { fontFamily: 'Georgia', fontSize: 20, letterSpacing: -0.5 },
  seeAllBtn: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md },
  seeAll: { ...Typography.bodySmall, fontWeight: '500' },
  cardsContainer: { paddingLeft: Spacing.xl, paddingRight: Spacing.lg, gap: 16 },
  exploreCard: { width: SCREEN_W * 0.75, height: 320, borderRadius: Radius.xl, overflow: 'hidden', position: 'relative' },
  exploreCardImage: { ...StyleSheet.absoluteFill, width: '100%', height: '100%' },
  exploreCardOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.20)' },
  exploreCardContent: { flex: 1, justifyContent: 'space-between', padding: Spacing.xl },
  exploreTagBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: Spacing.md, paddingVertical: 5, borderRadius: Radius.full },
  exploreTagText: { fontFamily: 'Inter', fontWeight: '600', fontSize: 11, letterSpacing: 0.5 },
  exploreCardBottom: { gap: 4 },
  exploreCardTitle: { fontFamily: 'Georgia', fontSize: 22, letterSpacing: -0.5 },
  exploreCardSub: { fontFamily: 'Inter', fontWeight: '400', fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  exploreCardDesc: { fontFamily: 'Inter', fontWeight: '400', fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 17, marginTop: 4 },
  exploreCardAction: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: Spacing.md },
  exploreCardActionText: { fontFamily: 'Inter', fontWeight: '600', fontSize: 13 },
  pagination: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: Spacing.lg },
  dot: { width: 6, height: 6, borderRadius: 3 },
  dotActive: { width: 20 },
  featuredGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.xl, gap: Spacing.md },
  featuredCard: { width: (SCREEN_W - 52) / 2, height: 180, borderRadius: Radius.lg, overflow: 'hidden', position: 'relative' },
  featuredImage: { ...StyleSheet.absoluteFill, width: '100%', height: '100%' },
  featuredOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.12)' },
  featuredBadge: { position: 'absolute', top: Spacing.md, right: Spacing.md, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: Radius.full },
  featuredMatch: { fontFamily: 'Inter', fontWeight: '600', fontSize: 12 },
  featuredInfo: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: Spacing.md, backgroundColor: 'rgba(0,0,0,0.45)' },
  featuredName: { fontFamily: 'Georgia', fontSize: 14, lineHeight: 18 },
  featuredPrice: { fontFamily: 'Inter', fontWeight: '400', fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  searchSection: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg, paddingBottom: Spacing.md },
  searchInputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: Radius.lg, paddingHorizontal: Spacing.md, paddingVertical: Spacing.md, gap: Spacing.sm, borderWidth: 1.5, ...Shadows.sm },
  searchInputFocused: { ...Shadows.md },
  searchInput: { flex: 1, ...Typography.body, padding: 0 },
  searchClearBtn: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  searchResults: { marginTop: Spacing.md, borderRadius: Radius.lg, overflow: 'hidden', ...Shadows.sm },
  searchResultItem: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md, gap: Spacing.md, borderBottomWidth: 0.5 },
  searchResultIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  searchResultInfo: { flex: 1 },
  searchResultLabel: { ...Typography.body, fontWeight: '500' },
  searchResultCount: { ...Typography.caption, marginTop: 2 },
  searchNoResults: { alignItems: 'center', paddingVertical: Spacing.xxxl, gap: Spacing.md },
  searchNoResultsText: { ...Typography.body },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginTop: Spacing.md },
  serviceItem: { width: '30%', alignItems: 'center', padding: Spacing.md, borderRadius: Radius.lg, gap: Spacing.sm, ...Shadows.xs },
  serviceIconContainer: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  serviceLabel: { ...Typography.caption, fontWeight: '600' },
  serviceCount: { ...Typography.captionSmall },
  tabBarContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, borderTopWidth: 0.5, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 10 },
  tabBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', paddingTop: Spacing.sm },
  tabItem: { alignItems: 'center', justifyContent: 'center', minWidth: 52, minHeight: 48, paddingVertical: Spacing.xs, gap: 3, flex: 1 },
  mapButton: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm, marginTop: -24, ...Shadows.lg },
  mapButtonInner: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  tabLabel: { ...Typography.captionSmall, fontWeight: '500' },
  tabLabelActive: { fontWeight: '600' },
});
