// Light mode - Warm & vibrant
export const LightColors = {
  // Surfaces - warm creams, not cold grays
  background: '#FDFBF7',
  foreground: '#1A1614',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceSubtle: '#F5F0E8',
  surfaceMuted: '#FAF7F2',

  // Brand - rich amber + coral
  primary: '#D97706',
  primaryGold: '#EAB308',
  primaryLight: '#FEF3C7',

  // Accents - saturated & warm
  secondary: '#FFF7ED',
  secondaryFaint: 'rgba(217,119,6,0.08)',
  olive: '#16A34A',
  citron: '#EAB308',
  pin: '#DC2626',
  accentCoral: '#F43F5E',
  accentTeal: '#0D9488',
  accentIndigo: '#6366F1',

  // Text - warm blacks
  textPrimary: '#1A1614',
  textSecondary: '#78716C',
  textTertiary: '#A8A29E',
  textInverse: '#FFFFFF',
  textDisabled: '#D6D3D1',

  // Legacy aliases
  muted: '#78716C',
  mutedLight: '#A8A29E',
  mutedFaint: '#E7E5E4',

  // Borders - warm
  border: '#E7E5E4',
  borderLight: '#F5F5F4',
  borderStrong: '#D6D3D1',
  borderFocus: '#D97706',

  // Cards
  cardBg: '#FAF7F2',
  cardWhite: '#FFFFFF',

  // Utility
  white: '#FFFFFF',
  black: '#1A1614',
  success: '#16A34A',
  error: '#DC2626',
  warning: '#D97706',
  info: '#2563EB',

  // Overlay
  overlay: 'rgba(26,22,20,0.5)',
  overlayLight: 'rgba(26,22,20,0.25)',
  overlayHeavy: 'rgba(26,22,20,0.7)',

  // Gradients - warm sunset
  gradientStart: '#D97706',
  gradientMid: '#EA580C',
  gradientEnd: '#DC2626',

  // Skeleton
  shimmer: '#F0EBE3',
  skeleton: '#F0EBE3',
} as const;

// Dark mode - rich & deep
export const DarkColors = {
  // Surfaces - deep warm dark
  background: '#070707', foreground: '#F5F5F5', surface: '#111111',
  surfaceElevated: '#191919', surfaceSubtle: '#141414', surfaceMuted: '#0B0B0B',

  // Brand - glowing amber on dark
  // Keep primary actions distinct from white copy: white-on-white controls
  // become unreadable in dark mode when primary is also white.
  primary: '#C76A16', primaryGold: '#F5F5F5', primaryLight: '#322315',

  // Accents - neon on dark
  secondary: '#171717', secondaryFaint: 'rgba(255,255,255,0.07)', olive: '#A3E635', citron: '#FACC15',
  pin: '#F87171',
  accentCoral: '#FB7185',
  accentTeal: '#2DD4BF',
  accentIndigo: '#818CF8',

  // Text - warm whites
  textPrimary: '#F5F5F5', textSecondary: '#A3A3A3', textTertiary: '#737373', textInverse: '#080808',
  textDisabled: '#57534E',

  // Legacy aliases
  muted: '#A8A29E',
  mutedLight: '#78716C',
  mutedFaint: '#57534E',

  // Borders
  border: '#292929', borderLight: '#1C1C1C', borderStrong: '#404040', borderFocus: '#F5F5F5',

  // Cards
  cardBg: '#1E1B18',
  cardWhite: '#1E1B18',

  // Utility
  white: '#F5F0E8',
  black: '#121010',
  success: '#4ADE80',
  error: '#F87171',
  warning: '#FBBF24',
  info: '#60A5FA',

  // Overlay
  overlay: 'rgba(18,16,16,0.85)',
  overlayLight: 'rgba(18,16,16,0.6)',
  overlayHeavy: 'rgba(18,16,16,0.92)',

  // Gradients - warm fire
  gradientStart: '#92400E',
  gradientMid: '#B45309',
  gradientEnd: '#D97706',

  // Skeleton
  shimmer: '#292420',
  skeleton: '#292420',
} as const;

// Default to light mode
export const Colors = LightColors;

export type ColorToken = keyof typeof Colors;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  massive: 56,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
} as const;

// These names are registered in App.tsx with expo-font. A CSS-style fallback
// list is not valid in React Native and silently falls back to the OS font.
export const FontStack = 'Inter';
export const FontMedium = 'Inter-Medium';
export const FontSemiBold = 'Inter-SemiBold';
export const FontBold = 'Inter-Bold';
export const FontMono = 'Geist Mono';
// The supplied prototype uses an editorial serif for display, a compact UI
// sans for interface copy, and Outfit only for the wordmark.
export const FontDisplay = 'Besley';
export const FontUi = 'Google Sans Flex';
export const FontUiLight = 'Google Sans Flex-Light';
export const FontUiMedium = 'Google Sans Flex-Medium';
export const FontBrand = 'Outfit-Medium';

export const Typography = {
  display: {
    fontFamily: FontDisplay,
    fontSize: 30,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 36,
  },
  h1: {
    fontFamily: FontDisplay,
    fontSize: 26,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 32,
  },
  h2: {
    fontFamily: FontDisplay,
    fontSize: 22,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 28,
  },
  h3: {
    fontFamily: FontDisplay,
    fontSize: 20,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 24,
  },
  sectionTitle: {
    fontFamily: FontDisplay,
    fontSize: 16,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 20,
  },
  subtitle: {
    fontFamily: FontUiLight,
    fontSize: 14,
    fontWeight: '300' as const,
    letterSpacing: 0,
    lineHeight: 20,
  },
  body: {
    fontFamily: FontUiLight,
    fontSize: 14,
    fontWeight: '300' as const,
    letterSpacing: 0,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: FontUiLight,
    fontSize: 14,
    fontWeight: '300' as const,
    letterSpacing: 0,
    lineHeight: 20,
  },
  caption: {
    fontFamily: FontUiLight,
    fontSize: 12,
    fontWeight: '300' as const,
    letterSpacing: 0.1,
    lineHeight: 16,
  },
  captionSmall: {
    fontFamily: FontUiMedium,
    fontSize: 12,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  label: {
    fontFamily: FontUiMedium,
    fontSize: 12,
    fontWeight: '600' as const,
    letterSpacing: 1.0,
    lineHeight: 16,
  },
  button: {
    fontFamily: FontUiMedium,
    fontSize: 14,
    fontWeight: '500' as const,
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  buttonSmall: {
    fontFamily: FontUiMedium,
    fontSize: 14,
    fontWeight: '500' as const,
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  tag: {
    fontFamily: FontUiMedium,
    fontSize: 11,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
    lineHeight: 14,
  },
  overline: {
    fontFamily: FontUiMedium,
    fontSize: 10,
    fontWeight: '500' as const,
    letterSpacing: 1.5,
    lineHeight: 14,
  },
} as const;

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.20,
    shadowRadius: 32,
    elevation: 12,
  },
} as const;

export const Layout = {
  screenHorizontalPadding: 20,
  cardBorderRadius: 12,
  borderRadiusFull: 999,
  touchTargetMin: 44,
} as const;
