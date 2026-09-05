import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  PanResponder,
  Animated,
  RefreshControl,
} from 'react-native';
import { Colors } from '../theme/colors';
import StatusBar from '../components/StatusBar';
import TopBar from '../components/TopBar';
import BottomMenu from '../components/BottomMenu';
import YMark from '../components/YMark';
import { Pill } from '../components/Pill';
import { Icon, IconName } from '../components/Icon';
import { LISTINGS, type Listing, type PropertyType } from '../data/listings';
import { hapticLight, hapticSelection, hapticSuccess } from '../utils/haptics';

type FilterKey = 'all' | 'Hotel' | 'Villa' | 'Resort' | 'Camping' | 'Cabin' | 'House' | 'Budget';

const CHIPS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All options' },
  { key: 'Hotel', label: 'Hotel' },
  { key: 'Villa', label: 'Villa' },
  { key: 'Resort', label: 'Resort' },
  { key: 'Camping', label: 'Camping' },
  { key: 'Cabin', label: 'Cabin' },
  { key: 'House', label: 'House' },
  { key: 'Budget', label: 'Budget' },
];

const SAVE_REVEAL = 80;
const SAVE_THRESHOLD = 40;

export default function V2ScanSaveScreen({ navigation }: { navigation: any }) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [refreshing, setRefreshing] = useState(false);

  const filtered = LISTINGS.filter((l) => {
    if (filter === 'all') return true;
    if (filter === 'Budget') return l.price === '$';
    return l.type === (filter as PropertyType);
  });

  const onSave = (id: string) => {
    hapticSuccess();
    setSavedIds((s) => new Set(s).add(id));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => setRefreshing(false), 800);
            }}
            tintColor={Colors.primaryGold}
            colors={[Colors.primaryGold]}
          />
        }
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar />
        <TopBar onBack={() => navigation.goBack()} />

        <View style={styles.header}>
          <View style={styles.headerRow}>
            <YMark />
            <View style={styles.headerTextCol}>
              <Text style={styles.headerTitle}>
                Your <Text style={{ color: Colors.muted }}>twelve</Text> curated picks
              </Text>
              <Text style={styles.headerSub}>Based on your trip preferences</Text>
            </View>
          </View>
          <Text style={styles.headerLocation}>
            Barcelona · Jun 15-22 · 2 guests
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipContainer}
          style={styles.chipScroll}
        >
          {CHIPS.map((c) => {
            const active = filter === c.key;
            return (
              <TouchableOpacity
                key={c.key}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => {
                  hapticLight();
                  setFilter(c.key);
                }}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {c.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.listingsContainer}>
          {filtered.map((listing, i) => (
            <View key={listing.id}>
              <SwipeRow
                listing={listing}
                onSave={() => onSave(listing.id)}
                saved={savedIds.has(listing.id)}
                onPress={() => navigation.navigate('PropertyDetails', { listing })}
              />
              {i < filtered.length - 1 && <View style={styles.listingDivider} />}
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomMenu navigation={navigation} />
    </View>
  );
}

function SwipeRow({
  listing,
  onSave,
  saved,
  onPress,
}: {
  listing: Listing;
  onSave: () => void;
  saved: boolean;
  onPress: () => void;
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [isRevealed, setIsRevealed] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          hapticSelection();
          translateX.setValue(Math.max(gestureState.dx, -SAVE_REVEAL));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -SAVE_THRESHOLD) {
          Animated.spring(translateX, {
            toValue: -SAVE_REVEAL,
            useNativeDriver: true,
          }).start();
          setIsRevealed(true);
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          setIsRevealed(false);
        }
      },
    })
  ).current;

  const handleSave = () => {
    onSave();
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setIsRevealed(false);
  };

  return (
    <View style={styles.swipeContainer}>
      <View style={styles.saveBehind}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={!isRevealed}
        >
          <Icon name={IconName.Heart} size={12} color={Colors.white} />
          <Text style={styles.saveText}>{saved ? 'Saved' : 'Save'}</Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[styles.swipeForeground, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity onPress={onPress} activeOpacity={1}>
          <ListingRow listing={listing} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function ListingRow({ listing }: { listing: Listing }) {
  return (
    <View style={styles.listingRow}>
      <Image source={{ uri: listing.image }} style={styles.listingThumb} />
      <View style={styles.listingInfo}>
        <View style={styles.listingInfoLeft}>
          <Text style={styles.listingName} numberOfLines={1}>
            {listing.name}
          </Text>
          <View style={styles.listingSpecs}>
            <SpecItem label={listing.type} />
            <SpecItem label={`Guests ${listing.guests}`} />
            <SpecItem label={`Price ${listing.price}`} />
          </View>
        </View>
          <View style={styles.listingInfoRight}>
          <View style={styles.matchPill}>
            <Text style={styles.matchText}>{listing.match}% Match</Text>
          </View>
          <View style={styles.ratingRow}>
            <Icon name={IconName.Star} size={11} color={Colors.primaryGold} />
            <Text style={styles.ratingText}>{listing.rating.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function SpecItem({ label }: { label: string }) {
  return (
    <View style={styles.specItem}>
      <Text style={styles.specText}>• {label}</Text>
    </View>
  );
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
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTextCol: {
    gap: 2,
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 16,
    color: Colors.black,
    lineHeight: 19.2,
  },
  headerSub: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 13,
    color: 'rgba(0,0,0,0.6)',
    lineHeight: 15.6,
  },
  headerLocation: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    color: 'rgba(0,0,0,0.4)',
    lineHeight: 14.4,
  },
  chipScroll: {
    marginTop: 20,
  },
  chipContainer: {
    paddingHorizontal: 20,
    gap: 5.678,
  },
  chip: {
    backgroundColor: Colors.secondaryFaint,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 82.838,
  },
  chipActive: {
    backgroundColor: Colors.olive,
  },
  chipText: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    color: Colors.black,
    letterSpacing: -0.12,
  },
  chipTextActive: {
    color: Colors.cardBg,
  },
  listingsContainer: {
    paddingTop: 16,
  },
  listingDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginHorizontal: 20,
  },
  swipeContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  saveBehind: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: SAVE_REVEAL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: Colors.olive,
    width: 63.537,
    height: 67.117,
    borderRadius: 4.474,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  saveText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 11,
    color: Colors.white,
    lineHeight: 13.2,
  },
  swipeForeground: {
    backgroundColor: Colors.cardBg,
    width: '100%',
  },
  listingRow: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 20,
    gap: 15,
    alignItems: 'flex-start',
  },
  listingThumb: {
    width: 89.629,
    height: 82.09,
    borderRadius: 6.701,
  },
  listingInfo: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  listingInfoLeft: {
    flex: 1,
    gap: 8,
  },
  listingInfoRight: {
    alignItems: 'flex-end',
    gap: 5.608,
  },
  listingName: {
    fontFamily: 'Georgia',
    fontSize: 14,
    color: Colors.black,
    lineHeight: 16.8,
  },
  listingSpecs: {
    gap: 6,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  specText: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    color: Colors.black,
    lineHeight: 14.4,
    letterSpacing: 0.12,
  },
  matchPill: {
    backgroundColor: Colors.citron,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 74.26,
  },
  matchText: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    color: Colors.black,
    lineHeight: 14.4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3.505,
  },
  ratingText: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    color: Colors.black,
    letterSpacing: 0.48,
    lineHeight: 14.4,
  },
});
