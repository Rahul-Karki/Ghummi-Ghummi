import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Spacing, Radius, Typography, Shadows } from '../theme/ThemeContext';
import { Icon, IconName } from '../components/Icon';
import { hapticLight } from '../utils/haptics';
import { Toast } from '../components/Toast';

const PROFILE = {
  name: 'Sarah Chen',
  email: 'sarah.chen@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=90&auto=format&fit=crop',
  joined: 'January 2024',
  trips: 12,
  saved: 4,
  reviews: 8,
};

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: IconName.User, label: 'Edit Profile', subtitle: 'Name, photo, phone number' },
      { icon: IconName.Shield, label: 'Verification', subtitle: 'ID verified · Email verified' },
      { icon: IconName.CreditCard, label: 'Payment Methods', subtitle: 'Visa ···· 4242' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: IconName.Bell, label: 'Notifications', subtitle: 'Push & email' },
      { icon: IconName.Globe, label: 'Language', subtitle: 'English' },
      { icon: IconName.DollarSign, label: 'Currency', subtitle: 'USD ($)' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: IconName.HelpCircle, label: 'Help Center', subtitle: 'FAQs & contact' },
      { icon: IconName.Shield, label: 'Safety', subtitle: 'Emergency & safety info' },
    ],
  },
];

export default function ProfileScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { colors, isDark, toggleTheme } = useTheme();
  const [toast, setToast] = useState({ visible: false, message: '' });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header with profile */}
        <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
          <Image source={{ uri: PROFILE.avatar }} style={styles.avatar} />
          <Text style={[styles.name, { color: colors.textPrimary }]}>{PROFILE.name}</Text>
          <Text style={[styles.email, { color: colors.textSecondary }]}>{PROFILE.email}</Text>
          <Text style={[styles.joined, { color: colors.textTertiary }]}>
            Member since {PROFILE.joined}
          </Text>
        </View>

        {/* Stats row */}
        <View style={[styles.statsRow, { backgroundColor: colors.cardWhite, marginHorizontal: Spacing.xl }]}>
          {[
            { value: PROFILE.trips, label: 'Trips' },
            { value: PROFILE.saved, label: 'Saved' },
            { value: PROFILE.reviews, label: 'Reviews' },
          ].map((stat, i) => (
            <View
              key={stat.label}
              style={[
                styles.statItem,
                i < 2 && { borderRightWidth: 1, borderRightColor: colors.border },
              ]}
            >
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Dark mode toggle */}
        <TouchableOpacity
          style={[styles.themeToggle, { backgroundColor: colors.cardWhite, marginHorizontal: Spacing.xl }]}
          onPress={() => {
            hapticLight();
            toggleTheme();
          }}
          activeOpacity={0.7}
        >
          <View style={[styles.themeIcon, { backgroundColor: isDark ? 'rgba(129,140,248,0.15)' : 'rgba(99,102,241,0.1)' }]}>
            <Icon
              name={isDark ? IconName.Moon : IconName.Sun}
              size={20}
              color={isDark ? colors.primary : colors.primary}
              strokeWidth={2}
            />
          </View>
          <View style={styles.themeInfo}>
            <Text style={[styles.themeLabel, { color: colors.textPrimary }]}>
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <Text style={[styles.themeDesc, { color: colors.textSecondary }]}>
              Tap to switch theme
            </Text>
          </View>
          <View style={[styles.toggleTrack, { backgroundColor: isDark ? colors.primary : colors.border }]}>
            <View style={[styles.toggleThumb, { 
              backgroundColor: colors.surface,
              transform: [{ translateX: isDark ? 20 : 2 }],
            }]} />
          </View>
        </TouchableOpacity>

        {/* Menu sections */}
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>
              {section.title.toUpperCase()}
            </Text>
            <View style={[styles.menuGroup, { backgroundColor: colors.cardWhite }]}>
              {section.items.map((item, i) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.menuItem,
                    i < section.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
                  ]}
                  activeOpacity={0.6}
                  onPress={() => {
                    hapticLight();
                    setToast({ visible: true, message: `${item.label} coming soon` });
                  }}
                >
                  <View style={[styles.menuIcon, { backgroundColor: colors.surfaceSubtle }]}>
                    <Icon name={item.icon} size={18} color={colors.textSecondary} strokeWidth={1.8} />
                  </View>
                  <View style={styles.menuInfo}>
                    <Text style={[styles.menuLabel, { color: colors.textPrimary }]}>{item.label}</Text>
                    <Text style={[styles.menuSubtitle, { color: colors.textTertiary }]}>{item.subtitle}</Text>
                  </View>
                  <Icon name={IconName.ChevronRight} size={16} color={colors.mutedFaint} strokeWidth={1.5} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Sign out */}
        <TouchableOpacity
          style={[styles.signOutBtn, { borderColor: colors.error }]}
          onPress={() => {
            hapticLight();
            setToast({ visible: true, message: 'Signed out' });
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.signOutText, { color: colors.error }]}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={[styles.version, { color: colors.textTertiary }]}>Ghummi v1.0.0</Text>
      </ScrollView>

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
  container: { flex: 1 },
  header: {
    alignItems: 'center',
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: Spacing.md,
  },
  name: {
    ...Typography.h2,
    fontWeight: '600',
  },
  email: {
    ...Typography.body,
    marginTop: 2,
  },
  joined: {
    ...Typography.caption,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.xs,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...Typography.h2,
    fontWeight: '700',
  },
  statLabel: {
    ...Typography.caption,
    marginTop: 2,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xxl,
    gap: Spacing.md,
    ...Shadows.xs,
  },
  themeIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeInfo: {
    flex: 1,
  },
  themeLabel: {
    ...Typography.body,
    fontWeight: '600',
  },
  themeDesc: {
    ...Typography.caption,
    marginTop: 1,
  },
  toggleTrack: {
    width: 48,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.overline,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  menuGroup: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginHorizontal: Spacing.xl,
    ...Shadows.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuInfo: {
    flex: 1,
  },
  menuLabel: {
    ...Typography.body,
    fontWeight: '500',
  },
  menuSubtitle: {
    ...Typography.caption,
    marginTop: 1,
  },
  signOutBtn: {
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  signOutText: {
    ...Typography.button,
  },
  version: {
    ...Typography.caption,
    textAlign: 'center',
    marginTop: Spacing.xxl,
    marginBottom: Spacing.lg,
  },
});
