import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Typography, Spacing, Radius, Shadows } from '../theme/ThemeContext';
import { Icon, IconName } from '../components/Icon';
import { Button } from '../components/Button';
import { Toast } from '../components/Toast';
import { hapticLight, hapticMedium, hapticSuccess } from '../utils/haptics';

const STEPS = [
  { icon: IconName.Compass, text: 'Planning your adventure...' },
  { icon: IconName.MapPin, text: 'Finding the best places...' },
  { icon: IconName.Building2, text: 'Building your itinerary...' },
  { icon: IconName.Navigation, text: 'Optimizing your route...' },
  { icon: IconName.DollarSign, text: 'Checking your budget...' },
  { icon: IconName.Star, text: 'Finalizing your trip...' },
];

type GenerationState = 'idle' | 'generating' | 'success' | 'error' | 'cancelled';

type Props = { navigation: any };

export default function AIGenerationScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [state, setState] = useState<GenerationState>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: '', variant: 'info' as 'success' | 'error' | 'info' });

  const progressAnim = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (state === 'generating') {
      runGeneration();
    }
  }, [state]);

  const runGeneration = () => {
    setCurrentStep(0);
    progressAnim.setValue(0);

    const stepDuration = 1800;
    let stepIndex = 0;

    const runStep = () => {
      if (stepIndex >= STEPS.length) {
        setState('success');
        hapticSuccess();
        Animated.spring(checkScale, {
          toValue: 1,
          damping: 10,
          stiffness: 100,
          useNativeDriver: true,
        }).start();
        return;
      }

      setCurrentStep(stepIndex);

      Animated.timing(progressAnim, {
        toValue: (stepIndex + 1) / STEPS.length,
        duration: stepDuration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();

      stepIndex++;
      setTimeout(runStep, stepDuration);
    };

    runStep();
  };

  const handleStart = () => {
    hapticMedium();
    setState('generating');
  };

  const handleCancel = () => {
    hapticLight();
    setState('cancelled');
    setToast({ visible: true, message: 'Generation cancelled', variant: 'info' });
  };

  const handleRetry = () => {
    hapticMedium();
    setState('generating');
  };

  const handleViewTrip = () => {
    hapticSuccess();
    navigation.navigate('V3ImageLed');
  };

  useEffect(() => {
    if (state === 'generating') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [state]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.heroSection, { paddingTop: insets.top + Spacing.xl }]}>
          {state === 'idle' && (
            <>
              <View style={[styles.heroIconContainer, { backgroundColor: colors.surfaceSubtle }]}>
                <Icon name={IconName.Compass} size={48} color={colors.primaryGold} strokeWidth={1.5} />
              </View>
              <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>Plan Your Perfect Trip</Text>
              <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
                Let our AI create a personalized itinerary based on your preferences, budget, and travel style.
              </Text>
            </>
          )}

          {state === 'generating' && (
            <>
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <View style={[styles.heroIconContainer, { backgroundColor: colors.surfaceSubtle }]}>
                  <Icon name={STEPS[currentStep]?.icon || IconName.Compass} size={48} color={colors.primaryGold} strokeWidth={1.5} />
                </View>
              </Animated.View>
              <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>{STEPS[currentStep]?.text || 'Generating...'}</Text>
              <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
                Step {currentStep + 1} of {STEPS.length}
              </Text>

              <View style={styles.progressContainer}>
                <View style={[styles.progressTrack, { backgroundColor: colors.surfaceSubtle }]}>
                  <Animated.View
                    style={[styles.progressFill, { width: progressWidth, backgroundColor: colors.primaryGold }]}
                  />
                </View>
                <Text style={[styles.progressPercent, { color: colors.textTertiary }]}>
                  {Math.round(((currentStep + 1) / STEPS.length) * 100)}%
                </Text>
              </View>
            </>
          )}

          {state === 'success' && (
            <>
              <Animated.View style={{ transform: [{ scale: checkScale }] }}>
                <View style={[styles.heroIconContainer, { backgroundColor: colors.secondaryFaint }]}>
                  <Icon name={IconName.Heart} size={48} color={colors.success} strokeWidth={1.5} />
                </View>
              </Animated.View>
              <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>Your Trip is Ready</Text>
              <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
                We've created a personalized 7-day itinerary for San Francisco with handpicked stays and activities.
              </Text>
            </>
          )}

          {state === 'error' && (
            <>
              <View style={[styles.heroIconContainer, { backgroundColor: colors.secondaryFaint }]}>
                <Icon name={IconName.Heart} size={48} color={colors.error} strokeWidth={1.5} />
              </View>
              <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>Generation Failed</Text>
              <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
                Something went wrong while creating your itinerary. Please try again.
              </Text>
            </>
          )}

          {state === 'cancelled' && (
            <>
              <View style={[styles.heroIconContainer, { backgroundColor: colors.surfaceSubtle }]}>
                <Icon name={IconName.Compass} size={48} color={colors.muted} strokeWidth={1.5} />
              </View>
              <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>Generation Cancelled</Text>
              <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
                No worries! You can start again whenever you're ready.
              </Text>
            </>
          )}
        </View>

        {state === 'idle' && (
          <View style={[styles.preferencesCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.prefsTitle, { color: colors.textTertiary }]}>Trip Details</Text>
            <View style={styles.prefRow}>
              <Icon name={IconName.MapPin} size={16} color={colors.primary} />
              <Text style={[styles.prefLabel, { color: colors.textSecondary }]}>Destination</Text>
              <Text style={[styles.prefValue, { color: colors.textPrimary }]}>San Francisco, CA</Text>
            </View>
            <View style={[styles.prefDivider, { backgroundColor: colors.border }]} />
            <View style={styles.prefRow}>
              <Icon name={IconName.Calendar} size={16} color={colors.primary} />
              <Text style={[styles.prefLabel, { color: colors.textSecondary }]}>Dates</Text>
              <Text style={[styles.prefValue, { color: colors.textPrimary }]}>Jun 15 – 22</Text>
            </View>
            <View style={[styles.prefDivider, { backgroundColor: colors.border }]} />
            <View style={styles.prefRow}>
              <Icon name={IconName.Users} size={16} color={colors.primary} />
              <Text style={[styles.prefLabel, { color: colors.textSecondary }]}>Travelers</Text>
              <Text style={[styles.prefValue, { color: colors.textPrimary }]}>2 guests</Text>
            </View>
            <View style={[styles.prefDivider, { backgroundColor: colors.border }]} />
            <View style={styles.prefRow}>
              <Icon name={IconName.DollarSign} size={16} color={colors.primary} />
              <Text style={[styles.prefLabel, { color: colors.textSecondary }]}>Budget</Text>
              <Text style={[styles.prefValue, { color: colors.textPrimary }]}>$150/night</Text>
            </View>
          </View>
        )}

        {state === 'success' && (
          <View style={[styles.tripPreview, { backgroundColor: colors.surface }]}>
            <View style={styles.tripPreviewRow}>
              <View style={styles.tripStat}>
                <Text style={[styles.tripStatValue, { color: colors.primary }]}>7</Text>
                <Text style={[styles.tripStatLabel, { color: colors.textSecondary }]}>Days</Text>
              </View>
              <View style={[styles.tripStatDivider, { backgroundColor: colors.border }]} />
              <View style={styles.tripStat}>
                <Text style={[styles.tripStatValue, { color: colors.primary }]}>5</Text>
                <Text style={[styles.tripStatLabel, { color: colors.textSecondary }]}>Places</Text>
              </View>
              <View style={[styles.tripStatDivider, { backgroundColor: colors.border }]} />
              <View style={styles.tripStat}>
                <Text style={[styles.tripStatValue, { color: colors.primary }]}>$1K</Text>
                <Text style={[styles.tripStatLabel, { color: colors.textSecondary }]}>Est. Cost</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={[styles.bottomActions, { paddingBottom: Math.max(insets.bottom, Spacing.lg) }]}>
        {state === 'idle' && (
          <Button
            label="Generate My Trip"
            onPress={handleStart}
            variant="primary"
            size="lg"
            fullWidth
            icon={<Icon name={IconName.Compass} size={18} color={colors.white} />}
          />
        )}

        {state === 'generating' && (
          <Button
            label="Cancel Generation"
            onPress={handleCancel}
            variant="outline"
            size="md"
            fullWidth
          />
        )}

        {state === 'success' && (
          <Button
            label="View My Trip"
            onPress={handleViewTrip}
            variant="primary"
            size="lg"
            fullWidth
            icon={<Icon name={IconName.ChevronRight} size={18} color={colors.white} />}
          />
        )}

        {state === 'error' && (
          <Button
            label="Try Again"
            onPress={handleRetry}
            variant="primary"
            size="lg"
            fullWidth
          />
        )}

        {state === 'cancelled' && (
          <Button
            label="Start Over"
            onPress={() => setState('idle')}
            variant="primary"
            size="lg"
            fullWidth
          />
        )}
      </View>

      <Toast
        message={toast.message}
        visible={toast.visible}
        variant={toast.variant as any}
        onDismiss={() => setToast({ visible: false, message: '', variant: 'info' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxxl,
  },
  heroIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  heroTitle: {
    ...Typography.h1,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  heroSub: {
    ...Typography.body,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.lg,
  },

  // Progress
  progressContainer: {
    width: '100%',
    marginTop: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.md,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressPercent: {
    ...Typography.caption,
    fontWeight: '600',
  },

  // Preferences card
  preferencesCard: {
    marginHorizontal: Spacing.xxl,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    ...Shadows.sm,
  },
  prefsTitle: {
    ...Typography.bodySmall,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: Spacing.lg,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  prefLabel: {
    ...Typography.body,
    flex: 1,
  },
  prefValue: {
    ...Typography.body,
    fontWeight: '600',
  },
  prefDivider: {
    height: 1,
  },

  // Trip preview
  tripPreview: {
    marginHorizontal: Spacing.xxl,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    ...Shadows.sm,
  },
  tripPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tripStat: {
    alignItems: 'center',
    gap: 4,
  },
  tripStatValue: {
    ...Typography.h2,
  },
  tripStatLabel: {
    ...Typography.caption,
  },
  tripStatDivider: {
    width: 1,
    height: 40,
  },

  // Bottom
  bottomActions: {
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.lg,
  },
});
