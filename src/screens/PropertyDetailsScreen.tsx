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
import { Colors, Spacing, Radius, Typography } from '../theme/colors';
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
  const insets = useSafeAreaInsets();
  const listing = route?.params?.listing ?? LISTINGS[0];
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
        message: `Check out ${listing.name} on Ghummi! ${listing.type} for ${listing.guests} guests - ${listing.price}`,
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
          onPress: () => Linking.openURL('mailto:alexandra@ghummi.com'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
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
            tintColor={Colors.primaryGold}
            colors={[Colors.primaryGold]}
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
          <View style={styles.carouselTopBar}>
            <TouchableOpacity
              style={styles.carouselBtn}
              onPress={() => {
                hapticLight();
                navigation.goBack();
              }}
              activeOpacity={0.7}
            >
              <Icon name={IconName.ArrowLeft} size={20} color={Colors.white} />
            </TouchableOpacity>
            <View style={styles.carouselTopRight}>
              <TouchableOpacity
                style={styles.carouselBtn}
                activeOpacity={0.7}
                onPress={handleShare}
                accessibilityLabel="Share this property"
                accessibilityRole="button"
              >
                <Icon name={IconName.Share2} size={18} color={Colors.white} />
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
                  color={saved ? Colors.primaryGold : Colors.white}
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
              <Text style={styles.propertyType}>{listing.type}</Text>
              <Text style={styles.propertyName}>{listing.name}</Text>
            </View>
            <View style={styles.matchBadge}>
              <Text style={styles.matchText}>{listing.match}% Match</Text>
            </View>
          </View>

          <View style={styles.infoMeta}>
            <View style={styles.metaItem}>
              <Icon name={IconName.Users} size={14} color={Colors.muted} />
              <Text style={styles.metaText}>Up to {listing.guests} guests</Text>
            </View>
            <View style={styles.metaDot} />
            <View style={styles.metaItem}>
              <Icon name={IconName.Star} size={14} color={Colors.primaryGold} />
              <Text style={styles.metaText}>{listing.rating.toFixed(2)}</Text>
            </View>
            <View style={styles.metaDot} />
            <View style={styles.metaItem}>
              <Icon name={IconName.MapPin} size={14} color={Colors.muted} />
              <Text style={styles.metaText}>0.3 km away</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this place</Text>
          <Text style={styles.aboutText}>
            A stunning {listing.type.toLowerCase()} nestled in the heart of San Francisco.
            Perfect for {listing.guests} guests looking for a premium stay with
            exceptional amenities and breathtaking views.
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {AMENITIES.map((amenity) => (
              <View key={amenity.label} style={styles.amenityItem}>
                <View style={styles.amenityIcon}>
                  <Icon name={amenity.icon} size={18} color={Colors.primary} />
                </View>
                <Text style={styles.amenityLabel}>{amenity.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Host */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hosted by</Text>
          <View style={styles.hostCard}>
            <View style={styles.hostAvatar}>
              <Text style={styles.hostInitial}>A</Text>
            </View>
            <View style={styles.hostInfo}>
              <Text style={styles.hostName}>Alexandra</Text>
              <Text style={styles.hostSub}>Superhost · 3 years hosting</Text>
            </View>
            <View style={styles.hostContact}>
              <TouchableOpacity
                style={styles.hostContactBtn}
                activeOpacity={0.7}
                onPress={handleCallHost}
                accessibilityLabel="Contact host by phone"
                accessibilityRole="button"
              >
                <Icon name={IconName.Phone} size={16} color={Colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.hostContactBtn}
                activeOpacity={0.7}
                onPress={handleCallHost}
                accessibilityLabel="Contact host by email"
                accessibilityRole="button"
              >
                <Icon name={IconName.Mail} size={16} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locationMap}>
            <View style={styles.locationPin}>
              <Icon name={IconName.MapPin} size={24} color={Colors.primaryGold} />
            </View>
            <Text style={styles.locationAddress}>
              San Francisco, California
            </Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, Spacing.lg) }]}>
        <View style={styles.priceCol}>
          <Text style={styles.priceAmount}>${listing.price === '$$$' ? '186' : listing.price === '$$' ? '146' : '96'}</Text>
          <Text style={styles.pricePer}>/night</Text>
        </View>
        <TouchableOpacity
          style={styles.reserveBtn}
          activeOpacity={0.85}
          onPress={handleReserve}
          accessibilityLabel="Reserve this property"
          accessibilityRole="button"
        >
          <Text style={styles.reserveText}>Reserve</Text>
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
    backgroundColor: Colors.background,
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
    top: 0,
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
    backgroundColor: Colors.white,
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
    color: Colors.primaryGold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  propertyName: {
    fontFamily: 'Georgia',
    fontSize: 24,
    color: Colors.black,
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  matchBadge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  matchText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 13,
    color: Colors.primary,
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
    color: Colors.muted,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.mutedFaint,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.xl,
  },

  // Sections
  section: {
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  sectionTitle: {
    fontFamily: 'Georgia',
    fontSize: 18,
    color: Colors.black,
    letterSpacing: -0.3,
  },
  aboutText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    color: Colors.mutedLight,
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
    backgroundColor: Colors.cardWhite,
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  amenityIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amenityLabel: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 13,
    color: Colors.black,
  },

  // Host
  hostCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardWhite,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    gap: Spacing.md,
  },
  hostAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hostInitial: {
    fontFamily: 'Georgia',
    fontSize: 20,
    color: Colors.white,
  },
  hostInfo: {
    flex: 1,
    gap: 2,
  },
  hostName: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 15,
    color: Colors.black,
  },
  hostSub: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    color: Colors.muted,
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
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Location
  locationMap: {
    height: 160,
    borderRadius: Radius.lg,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  locationPin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.cardWhite,
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
    color: Colors.muted,
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
    backgroundColor: Colors.cardWhite,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
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
    fontFamily: 'Georgia',
    fontSize: 22,
    color: Colors.black,
  },
  pricePer: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    color: Colors.muted,
  },
  reserveBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: Radius.full,
  },
  reserveText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 15,
    color: Colors.white,
    letterSpacing: 0.3,
  },
});
