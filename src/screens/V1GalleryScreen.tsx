import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { Colors } from '../theme/colors';
import StatusBar from '../components/StatusBar';
import TopBar from '../components/TopBar';
import BottomMenu from '../components/BottomMenu';
import { Pill } from '../components/Pill';
import { Icon, IconName } from '../components/Icon';
import { Skeleton } from '../components/Skeleton';
import { hapticLight, hapticSelection } from '../utils/haptics';
import { LISTINGS, DECK_IMAGES, type Listing } from '../data/listings';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 352.9;
const CARD_HEIGHT = 313.5;

export default function V1GalleryScreen({ navigation }: { navigation: any }) {
  const [view, setView] = useState<'gallery' | 'map'>('gallery');
  const [deckIdx, setDeckIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedId, setSelectedId] = useState('oasis');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const others = LISTINGS.slice(1);
  const shown = others.slice(0, visibleCount);
  const remaining = others.length - visibleCount;

  const handleAdvance = () => {
    hapticSelection();
    setDeckIdx((i) => (i + 1) % DECK_IMAGES.length);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar />
        <TopBar onBack={() => navigation.goBack()} />
        <View style={styles.header}>
          <Skeleton width={160} height={14} />
          <Skeleton width={220} height={14} />
        </View>
        <View style={styles.toggleContainer}>
          <Skeleton width={180} height={32} borderRadius={112} />
        </View>
        <View style={styles.deckContainer}>
          <Skeleton width={CARD_WIDTH} height={CARD_HEIGHT} borderRadius={20.9} />
        </View>
        <View style={styles.grid}>
          <Skeleton width={(SCREEN_WIDTH - 60) / 2} height={160} borderRadius={8} />
          <Skeleton width={(SCREEN_WIDTH - 60) / 2} height={160} borderRadius={8} />
          <Skeleton width={(SCREEN_WIDTH - 60) / 2} height={160} borderRadius={8} />
          <Skeleton width={(SCREEN_WIDTH - 60) / 2} height={160} borderRadius={8} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 800);
            }}
            tintColor={Colors.primaryGold}
            colors={[Colors.primaryGold]}
          />
        }
      >
        <StatusBar />
        <TopBar onBack={() => navigation.goBack()} />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>12 curated picks</Text>
          <Text style={styles.headerSubtitle}>
            San Francisco · Jun 15-22 · 2 guests
          </Text>
        </View>

        <View style={styles.toggleContainer}>
          <View style={styles.toggle}>
            <TouchableOpacity
              style={[styles.togglePill, view === 'map' && styles.togglePillActive]}
              onPress={() => {
                hapticLight();
                setView('map');
              }}
            >
              <Text style={[styles.toggleText, view === 'map' && styles.toggleTextActive]}>
                Map
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.togglePill, view === 'gallery' && styles.togglePillActive]}
              onPress={() => {
                hapticLight();
                setView('gallery');
              }}
            >
              <Text style={[styles.toggleText, view === 'gallery' && styles.toggleTextActive]}>
                Gallery
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {view === 'gallery' ? (
          <GalleryView
            deckIdx={deckIdx}
            onAdvance={handleAdvance}
            shown={shown}
            remaining={remaining}
            visibleCount={visibleCount}
            onShowMore={() => setVisibleCount(11)}
            navigation={navigation}
          />
        ) : (
          <MapView selectedId={selectedId} setSelectedId={setSelectedId} />
        )}
      </ScrollView>
      <BottomMenu navigation={navigation} />
    </View>
  );
}

function GalleryView({
  deckIdx,
  onAdvance,
  shown,
  remaining,
  visibleCount,
  onShowMore,
  navigation,
}: {
  deckIdx: number;
  onAdvance: () => void;
  shown: Listing[];
  remaining: number;
  visibleCount: number;
  onShowMore: () => void;
  navigation: any;
}) {
  return (
    <>
      <View style={styles.deckContainer}>
        <TouchableOpacity onPress={onAdvance} activeOpacity={0.9}>
          {DECK_IMAGES.map((img, imgIdx) => {
            const slot = slotForImage(imgIdx, deckIdx);
            const isFront = slot === 'front';
            return (
              <View
                key={imgIdx}
                style={[
                  styles.deckCard,
                  {
                    zIndex: isFront ? 4 : imgIdx === (deckIdx + 1) % 4 ? 3 : 2,
                    transform: [
                      { translateY: isFront ? 43 : slot === 'mid' ? 18 : 0 },
                      { scale: isFront ? 1 : slot === 'mid' ? 0.98 : 0.955 },
                      { rotate: isFront ? '0deg' : slot === 'mid' ? '2.53deg' : '-3.7deg' },
                    ],
                    opacity: isFront ? 1 : 0.9,
                  },
                ]}
              >
                <Image source={{ uri: img }} style={styles.deckImage} />
                <View style={styles.deckGradient} />
                {isFront && (
                  <View style={styles.deckPills}>
                    <View style={styles.deckPillRow}>
                      <Pill>Featured</Pill>
                      <Pill>91% Match</Pill>
                    </View>
                    <View style={styles.deckRating}>
                      <Icon name={IconName.Star} size={12} color={Colors.white} />
                      <Text style={styles.deckRatingText}>4.96</Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>More matches for you</Text>
        <Text style={styles.sectionCount}>
          {visibleCount} of 12
        </Text>
      </View>

      <View style={styles.grid}>
        {shown.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            navigation={navigation}
          />
        ))}
      </View>

      {visibleCount < others.length && (
        <View style={styles.viewMoreContainer}>
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={onShowMore}
            activeOpacity={0.8}
          >
            <Text style={styles.viewMoreText}>View More</Text>
            <Text style={styles.viewMoreCount}>· {remaining} Left</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

function ListingCard({
  listing,
  navigation,
}: {
  listing: Listing;
  navigation: any;
}) {
  return (
    <TouchableOpacity
      style={styles.listingCard}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('PropertyDetails', { listing })}
    >
      <Image source={{ uri: listing.image }} style={styles.listingImage} />
      <View style={styles.listingGradient} />
      <View style={styles.listingTopRow}>
        <Pill>{listing.match}% Match</Pill>
        <View style={styles.listingRatingRow}>
          <Icon name={IconName.Star} size={11} color={Colors.black} />
          <Text style={styles.listingRating}>{listing.rating.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function MapView({
  selectedId,
  setSelectedId,
}: {
  selectedId: string;
  setSelectedId: (id: string) => void;
}) {
  const selected = LISTINGS.find((l) => l.id === selectedId) ?? LISTINGS[0];

  return (
    <>
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapTitle}>Map</Text>
          <View style={styles.mapGrid}>
            <View style={styles.mapGridLineH} />
            <View style={[styles.mapGridLineH, styles.mapGridLineH2]} />
            <View style={styles.mapGridLineV} />
            <View style={[styles.mapGridLineV, styles.mapGridLineV2]} />
          </View>
          {LISTINGS.map((l) => (
            <TouchableOpacity
              key={l.id}
              style={[
                styles.mapPin,
                l.id === selectedId && styles.mapPinSelected,
              ]}
              onPress={() => setSelectedId(l.id)}
            >
              <Icon
                name={IconName.MapPin}
                size={l.id === selectedId ? 22 : 18}
                color={l.id === selectedId ? Colors.primaryGold : Colors.olive}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.specContainer}>
        <Text style={styles.specName}>{selected.name}</Text>
        <View style={styles.divider} />
        <SpecRow label={selected.type} />
        <View style={styles.divider} />
        <SpecRow label={`Number of Guests: ${selected.guests}`} />
        <View style={styles.divider} />
        <SpecRow label={`Price: ${selected.price}`} />
        <View style={styles.divider} />
      </View>
    </>
  );
}

function SpecRow({ label }: { label: string }) {
  return (
    <View style={styles.specRow}>
      <Text style={styles.specLabel}>{label}</Text>
    </View>
  );
}

const others = LISTINGS.slice(1);

const SLOT_ORDER: Array<'front' | 'mid' | 'back' | 'hidden'> = [
  'front', 'mid', 'back', 'hidden',
];

function slotForImage(imgIdx: number, deckIdx: number): string {
  return SLOT_ORDER[(imgIdx - deckIdx + DECK_IMAGES.length) % DECK_IMAGES.length];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cardBg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    gap: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 14,
    color: Colors.black,
    lineHeight: 16.8,
  },
  headerSubtitle: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 16.8,
  },
  toggleContainer: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  toggle: {
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    padding: 1,
    borderRadius: 112,
  },
  togglePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 64,
  },
  togglePillActive: {
    backgroundColor: Colors.primary,
  },
  toggleText: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    color: Colors.black,
  },
  toggleTextActive: {
    color: Colors.black,
  },
  deckContainer: {
    alignItems: 'center',
    marginTop: 25,
    height: 370,
  },
  deckCard: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20.9,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  deckImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20.9,
  },
  deckGradient: {
    ...StyleSheet.absoluteFill,
    borderRadius: 20.9,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  deckPills: {
    position: 'absolute',
    top: 15.6,
    left: 15.6,
    right: 15.6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deckPillRow: {
    flexDirection: 'row',
    gap: 10,
  },
  deckRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4.87,
  },
  deckRatingText: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    color: Colors.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 56,
  },
  sectionTitle: {
    fontFamily: 'Georgia',
    fontSize: 16,
    color: Colors.black,
    lineHeight: 19.2,
  },
  sectionCount: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 14,
    color: Colors.muted,
    letterSpacing: 0.7,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingTop: 18,
    gap: 20,
  },
  listingCard: {
    width: (SCREEN_WIDTH - 60) / 2,
    height: 160,
    borderRadius: 8,
    overflow: 'hidden',
  },
  listingImage: {
    width: '100%',
    height: '100%',
  },
  listingGradient: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  listingTopRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listingRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  listingRating: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    color: Colors.black,
  },
  viewMoreContainer: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  viewMoreButton: {
    width: '100%',
    borderWidth: 0.4,
    borderColor: 'rgba(189,142,60,0.4)',
    borderRadius: 76,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  viewMoreText: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    color: Colors.black,
  },
  viewMoreCount: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    color: Colors.muted,
  },
  mapContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  mapPlaceholder: {
    width: 362,
    height: 310,
    borderRadius: 20,
    backgroundColor: '#e8e4dc',
    overflow: 'hidden',
  },
  mapTitle: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 14,
    color: Colors.black,
    position: 'absolute',
    top: 14,
    left: 14,
    zIndex: 10,
  },
  mapGrid: {
    ...StyleSheet.absoluteFill,
  },
  mapGridLineH: {
    position: 'absolute',
    top: '33%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  mapGridLineH2: {
    top: '66%',
  },
  mapGridLineV: {
    position: 'absolute',
    left: '33%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  mapGridLineV2: {
    left: '66%',
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  mapPinSelected: {
    transform: [{ scale: 1.15 }],
  },
  specContainer: {
    padding: 25,
    gap: 15,
  },
  specName: {
    fontFamily: 'Georgia',
    fontSize: 20,
    color: Colors.black,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    width: '100%',
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  specLabel: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 14,
    color: Colors.black,
    lineHeight: 16.8,
  },
});
