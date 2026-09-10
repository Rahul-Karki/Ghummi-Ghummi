import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Share,
  Alert,
  Linking,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Spacing, Radius, Typography } from '../theme/ThemeContext';
import { Icon, IconName } from '../components/Icon';
import { Toast } from '../components/Toast';
import { LISTINGS, type Listing } from '../data/listings';
import { hapticLight, hapticMedium, hapticSuccess } from '../utils/haptics';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const AMENITIES = [
  { icon: IconName.Wifi, label: 'Free WiFi' },
  { icon: IconName.Car, label: 'Free Parking' },
  { icon: IconName.Coffee, label: 'Coffee Maker' },
  { icon: IconName.Utensils, label: 'Full Kitchen' },
  { icon: IconName.Dumbbell, label: 'Gym Access' },
  { icon: IconName.WavesLadder, label: 'Pool' },
];

type Props = {
  navigation: any;
  route: { params?: { listing?: Listing; listingId?: string } };
};

export default function PropertyDetailsScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  // Saved and map entry points pass only an id; resolve it so every card opens
  // its own details instead of silently falling back to the first listing.
  const listing = route?.params?.listing
    ?? LISTINGS.find((item) => item.id === route?.params?.listingId)
    ?? LISTINGS[0];
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [refreshing, setRefreshing] = useState(false);

  const images = [listing.image, listing.image, listing.image];

  const handleSave = () => {
    hapticSuccess();
    setSaved(!saved);
    setToast({
      visible: true,
      message: saved ? 'Removed from saved' : 'Added to saved',
    });
  };

  const handleShare = async () => {
    hapticLight();
    try {
      await Share.share({
        message: `Check out ${listing.name} on Verse! ${listing.type} for ${listing.guests} guests - ${listing.price}`,
        title: listing.name,
      });
    } catch {}
  };

  const handleReserve = () => {
    hapticMedium();
    Alert.alert(
      'Reserve ' + listing.name,
      `Book this ${listing.type.toLowerCase()} for ${listing.guests} guests?\n\nPrice: $${listing.price === '$$$' ? '186' : listing.price === '$$' ? '146' : '96'}/night`,
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

  const handleCallHost = () => {
    hapticLight();
    Alert.alert(
      'Contact Alexandra',
      'Would you like to call or email the host?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => Linking.openURL('tel:+1234567890'),
        },
        {
          text: 'Email',
          onPress: () => Linking.openURL('mailto:alexandra@verse.app'),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
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
        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / SCREEN_W
              );
              setActiveImage(index);
              hapticLight();
            }}
          >
            {images.map((img, i) => (
              <View key={i} style={styles.carouselImageContainer}>
                <Image source={{ uri: img }} style={styles.carouselImage} />
                {i === images.length - 1 && (
                  <View style={styles.carouselOverlay} />
                )}
              </View>
            ))}
          </Animated.ScrollView>

          {/* Back + Share + Save */}
          <View style={[styles.carouselTopBar, { top: insets.top + Spacing.sm }]}>
            <TouchableOpacity
              style={styles.carouselBtn}
              onPress={() => {
                hapticLight();
                navigation.goBack();
              }}
              activeOpacity={0.7}
            >
              <Icon name={IconName.ArrowLeft} size={20} color={colors.white} />
            </TouchableOpacity>
            <View style={styles.carouselTopRight}>
              <TouchableOpacity
                style={styles.carouselBtn}
                activeOpacity={0.7}
                onPress={handleShare}
                accessibilityLabel="Share this property"
                accessibilityRole="button"
              >
                <Icon name={IconName.Share2} size={18} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.carouselBtn}
                onPress={handleSave}
                activeOpacity={0.7}
                accessibilityLabel={saved ? 'Remove from saved' : 'Save this property'}
                accessibilityRole="button"
                accessibilityState={{ selected: saved }}
              >
                <Icon
                  name={IconName.Heart}
                  size={18}
                  color={saved ? colors.primaryGold : colors.white}
                  strokeWidth={saved ? 2.2 : 1.8}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Pagination Dots */}
          <View style={styles.carouselPagination}>
            {images.map((_, i) => {
              const inputRange = [
                (i - 1) * SCREEN_W,
                i * SCREEN_W,
                (i + 1) * SCREEN_W,
              ];
              const dotScaleX = scrollX.interpolate({
                inputRange,
                outputRange: [1, 3.33, 1],
                extrapolate: 'clamp',
              });
              const dotOpacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.4, 1, 0.4],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.carouselDot,
                    {
                      transform: [{ scaleX: dotScaleX }],
                      opacity: dotOpacity,
                      backgroundColor: colors.white,
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>

        {/* Property Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoHeader}>
            <View style={styles.infoHeaderLeft}>
              <Text style={[styles.propertyType, { color: colors.primaryGold }]}>{listing.type}</Text>
              <Text style={[styles.propertyName, { color: colors.textPrimary }]}>{listing.name}</Text>
            </View>
            <View style={[styles.matchBadge, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.matchText, { color: colors.primary }]}>{listing.match}% Match</Text>
            </View>
          </View>

          <View style={styles.infoMeta}>
            <View style={styles.metaItem}>
              <Icon name={IconName.Users} size={14} color={colors.muted} />
              <Text style={[styles.metaText, { color: colors.muted }]}>Up to {listing.guests} guests</Text>
            </View>
            <View style={[styles.metaDot, { backgroundColor: colors.mutedFaint }]} />
            <View style={styles.metaItem}>
              <Icon name={IconName.Star} size={14} color={colors.primaryGold} />
              <Text style={[styles.metaText, { color: colors.muted }]}>{listing.rating.toFixed(2)}</Text>
            </View>
            <View style={[styles.metaDot, { backgroundColor: colors.mutedFaint }]} />
            <View style={styles.metaItem}>
              <Icon name={IconName.MapPin} size={14} color={colors.muted} />
              <Text style={[styles.metaText, { color: colors.muted }]}>0.3 km away</Text>
            </View>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* About */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>About this place</Text>
          <Text style={[styles.aboutText, { color: colors.mutedLight }]}>
            A stunning {listing.type.toLowerCase()} nestled in the heart of Mumbai.
            Perfect for {listing.guests} guests looking for a premium stay with
            exceptional amenities and breathtaking views.
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {AMENITIES.map((amenity) => (
              <View key={amenity.label} style={[styles.amenityItem, { backgroundColor: colors.cardWhite }]}>
                <View style={[styles.amenityIcon, { backgroundColor: colors.secondary }]}>
                  <Icon name={amenity.icon} size={18} color={colors.primary} />
                </View>
                <Text style={[styles.amenityLabel, { color: colors.textPrimary }]}>{amenity.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Host */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Hosted by</Text>
          <View style={[styles.hostCard, { backgroundColor: colors.cardWhite }]}>
            <View style={[styles.hostAvatar, { backgroundColor: colors.primary }]}>
              <Text style={[styles.hostInitial, { color: colors.white }]}>A</Text>
            </View>
            <View style={styles.hostInfo}>
              <Text style={[styles.hostName, { color: colors.textPrimary }]}>Alexandra</Text>
              <Text style={[styles.hostSub, { color: colors.muted }]}>Superhost · 3 years hosting</Text>
            </View>
            <View style={styles.hostContact}>
              <TouchableOpacity
                style={[styles.hostContactBtn, { borderColor: colors.border }]}
                activeOpacity={0.7}
                onPress={handleCallHost}
                accessibilityLabel="Contact host by phone"
                accessibilityRole="button"
              >
                <Icon name={IconName.Phone} size={16} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.hostContactBtn, { borderColor: colors.border }]}
                activeOpacity={0.7}
                onPress={handleCallHost}
                accessibilityLabel="Contact host by email"
                accessibilityRole="button"
              >
                <Icon name={IconName.Mail} size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Location */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Location</Text>
          <View style={[styles.locationMap, { backgroundColor: colors.secondary }]}>
            <View style={[styles.locationPin, { backgroundColor: colors.cardWhite }]}>
              <Icon name={IconName.MapPin} size={24} color={colors.primaryGold} />
            </View>
            <Text style={[styles.locationAddress, { color: colors.muted }]}>
              Mumbai, Maharashtra
            </Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, Spacing.lg), backgroundColor: colors.cardWhite, borderTopColor: colors.border }]}>
        <View style={styles.priceCol}>
          <Text style={[styles.priceAmount, { color: colors.textPrimary }]}>${listing.price === '$$$' ? '186' : listing.price === '$$' ? '146' : '96'}</Text>
          <Text style={[styles.pricePer, { color: colors.muted }]}>/night</Text>
        </View>
        <TouchableOpacity
          style={[styles.reserveBtn, { backgroundColor: colors.primary }]}
          activeOpacity={0.85}
          onPress={handleReserve}
          accessibilityLabel="Reserve this property"
          accessibilityRole="button"
        >
          <Text style={[styles.reserveText, { color: colors.white }]}>Reserve</Text>
        </TouchableOpacity>
      </View>

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
  scrollContent: {
    paddingBottom: 0,
  },

  // Carousel
  carouselContainer: {
    height: SCREEN_H * 0.45,
    position: 'relative',
  },
  carouselImageContainer: {
    width: SCREEN_W,
    height: '100%',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  carouselTopBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    zIndex: 10,
  },
  carouselBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselTopRight: {
    flexDirection: 'row',
    gap: 10,
  },
  carouselPagination: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    zIndex: 10,
  },
  carouselDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  // Info
  infoSection: {
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoHeaderLeft: {
    flex: 1,
    gap: 4,
  },
  propertyType: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  propertyName: {
    fontFamily: 'Inter',
    fontSize: 24,
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  matchBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  matchText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 13,
  },
  infoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 13,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },

  // Divider
  divider: {
    height: 1,
    marginHorizontal: Spacing.xl,
  },

  // Sections
  section: {
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    letterSpacing: -0.3,
  },
  aboutText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
  },

  // Amenities
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '47%',
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  amenityIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amenityLabel: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 13,
  },

  // Host
  hostCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    gap: Spacing.md,
  },
  hostAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hostInitial: {
    fontFamily: 'Inter',
    fontSize: 20,
  },
  hostInfo: {
    flex: 1,
    gap: 2,
  },
  hostName: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 15,
  },
  hostSub: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
  },
  hostContact: {
    flexDirection: 'row',
    gap: 8,
  },
  hostContactBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Location
  locationMap: {
    height: 160,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  locationPin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  locationAddress: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 13,
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    borderTopWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 10,
  },
  priceCol: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  priceAmount: {
    fontFamily: 'Inter',
    fontSize: 22,
  },
  pricePer: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
  },
  reserveBtn: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: Radius.full,
  },
  reserveText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
