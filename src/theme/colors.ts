export const Colors = {
  // Semantic surface tokens
  background: '#FAFAF8',
  foreground: '#000000',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceSubtle: '#F5F3EE',
  surfaceMuted: '#FAFAF8',

  // Brand
  primary: '#1A1A2E',
  primaryGold: '#C8A951',
  primaryLight: '#DDD864',

  // Accent palette
  secondary: '#F5F3EE',
  secondaryFaint: 'rgba(133,126,56,0.08)',
  olive: '#857E38',
  citron: '#DDD864',
  pin: '#CFD205',

  // Text tokens
  textPrimary: '#000000',
  textSecondary: 'rgba(0,0,0,0.55)',
  textTertiary: 'rgba(0,0,0,0.35)',
  textInverse: '#FFFFFF',
  textDisabled: 'rgba(0,0,0,0.2)',

  // Legacy aliases (for gradual migration)
  muted: 'rgba(0,0,0,0.35)',
  mutedLight: 'rgba(0,0,0,0.55)',
  mutedFaint: 'rgba(0,0,0,0.12)',

  // Border tokens
  border: 'rgba(0,0,0,0.08)',
  borderLight: 'rgba(0,0,0,0.05)',
  borderStrong: 'rgba(0,0,0,0.15)',
  borderFocus: '#1A1A2E',

  // Card tokens
  cardBg: '#FAFAF8',
  cardWhite: '#FFFFFF',

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#007AFF',

  // Overlay tokens
  overlay: 'rgba(0,0,0,0.45)',
  overlayLight: 'rgba(0,0,0,0.25)',
  overlayHeavy: 'rgba(0,0,0,0.6)',

  // Gradient tokens
  gradientStart: '#1A1A2E',
  gradientMid: '#16213E',
  gradientEnd: '#0F3460',

  // Skeleton / loading
  shimmer: '#E8E4DC',
  skeleton: '#E8E4DC',
} as const;

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

export const FontStack = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
export const FontSerif = "'Georgia', serif";

export const Typography = {
  display: {
    fontFamily: FontSerif,
    fontSize: 32,
    fontWeight: '400' as const,
    letterSpacing: -1.0,
    lineHeight: 38,
  },
  h1: {
    fontFamily: FontSerif,
    fontSize: 28,
    fontWeight: '400' as const,
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  h2: {
    fontFamily: FontSerif,
    fontSize: 24,
    fontWeight: '400' as const,
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  h3: {
    fontFamily: FontSerif,
    fontSize: 20,
    fontWeight: '400' as const,
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  sectionTitle: {
    fontFamily: FontSerif,
    fontSize: 18,
    fontWeight: '400' as const,
    letterSpacing: -0.3,
    lineHeight: 23,
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
    fontSize: 14,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: FontStack,
    fontSize: 13,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 18,
  },
  caption: {
    fontFamily: FontStack,
    fontSize: 12,
    fontWeight: '400' as const,
    letterSpacing: 0.1,
    lineHeight: 16,
  },
  captionSmall: {
    fontFamily: FontStack,
    fontSize: 11,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
    lineHeight: 14,
  },
  label: {
    fontFamily: FontStack,
    fontSize: 12,
    fontWeight: '600' as const,
    letterSpacing: 1.0,
    lineHeight: 16,
  },
  button: {
    fontFamily: FontStack,
    fontSize: 15,
    fontWeight: '600' as const,
    letterSpacing: 0.3,
    lineHeight: 20,
  },
  buttonSmall: {
    fontFamily: FontStack,
    fontSize: 13,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
    lineHeight: 18,
  },
  tag: {
    fontFamily: FontStack,
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 0.5,
    lineHeight: 14,
  },
  overline: {
    fontFamily: FontStack,
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
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 10,
  },
} as const;

export const Layout = {
  screenHorizontalPadding: 20,
  cardBorderRadius: 12,
  borderRadiusFull: 999,
  touchTargetMin: 44,
} as const;
