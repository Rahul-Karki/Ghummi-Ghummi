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
  background: '#121010',
  foreground: '#F5F0E8',
  surface: '#1E1B18',
  surfaceElevated: '#292420',
  surfaceSubtle: '#1E1B18',
  surfaceMuted: '#121010',

  // Brand - glowing amber on dark
  primary: '#F59E0B',
  primaryGold: '#FBBF24',
  primaryLight: '#422006',

  // Accents - neon on dark
  secondary: '#1C1917',
  secondaryFaint: 'rgba(245,158,11,0.12)',
  olive: '#4ADE80',
  citron: '#FDE047',
  pin: '#F87171',
  accentCoral: '#FB7185',
  accentTeal: '#2DD4BF',
  accentIndigo: '#818CF8',

  // Text - warm whites
  textPrimary: '#F5F0E8',
  textSecondary: '#A8A29E',
  textTertiary: '#78716C',
  textInverse: '#1A1614',
  textDisabled: '#57534E',

  // Legacy aliases
  muted: '#A8A29E',
  mutedLight: '#78716C',
  mutedFaint: '#57534E',

  // Borders
  border: '#292420',
  borderLight: '#1E1B18',
  borderStrong: '#44403C',
  borderFocus: '#F59E0B',

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

export const Typography = {
  display: {
    fontFamily: FontBold,
    fontSize: 32,
    fontWeight: '700' as const,
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  h1: {
    fontFamily: FontBold,
    fontSize: 28,
    fontWeight: '700' as const,
    letterSpacing: -0.6,
    lineHeight: 34,
  },
  h2: {
    fontFamily: FontSemiBold,
    fontSize: 24,
    fontWeight: '600' as const,
    letterSpacing: -0.4,
    lineHeight: 30,
  },
  h3: {
    fontFamily: FontSemiBold,
    fontSize: 20,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
    lineHeight: 26,
  },
  sectionTitle: {
    fontFamily: FontSemiBold,
    fontSize: 18,
    fontWeight: '600' as const,
    letterSpacing: -0.1,
    lineHeight: 24,
  },
  subtitle: {
    fontFamily: FontStack,
    fontSize: 16,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 22,
  },
  body: {
    fontFamily: FontStack,
    fontSize: 16,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: FontStack,
    fontSize: 14,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 20,
  },
  caption: {
    fontFamily: FontStack,
    fontSize: 12,
    fontWeight: '400' as const,
    letterSpacing: 0.1,
    lineHeight: 16,
  },
  captionSmall: {
    fontFamily: FontMedium,
    fontSize: 12,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  label: {
    fontFamily: FontSemiBold,
    fontSize: 12,
    fontWeight: '600' as const,
    letterSpacing: 1.0,
    lineHeight: 16,
  },
  button: {
    fontFamily: FontSemiBold,
    fontSize: 16,
    fontWeight: '600' as const,
    letterSpacing: 0.3,
    lineHeight: 22,
  },
  buttonSmall: {
    fontFamily: FontSemiBold,
    fontSize: 14,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  tag: {
    fontFamily: FontSemiBold,
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 0.5,
    lineHeight: 14,
  },
  overline: {
    fontFamily: FontSemiBold,
    fontSize: 10,
    fontWeight: '600' as const,
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
