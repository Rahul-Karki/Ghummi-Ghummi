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
import { Colors, Typography, Spacing, Radius, Shadows } from '../theme/colors';
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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.heroSection, { paddingTop: insets.top + Spacing.xl }]}>
          {state === 'idle' && (
            <>
              <View style={styles.heroIconContainer}>
                <Icon name={IconName.Compass} size={48} color={Colors.primaryGold} strokeWidth={1.5} />
              </View>
              <Text style={styles.heroTitle}>Plan Your Perfect Trip</Text>
              <Text style={styles.heroSub}>
                Let our AI create a personalized itinerary based on your preferences, budget, and travel style.
              </Text>
            </>
          )}

          {state === 'generating' && (
            <>
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <View style={styles.heroIconContainer}>
                  <Icon name={STEPS[currentStep]?.icon || IconName.Compass} size={48} color={Colors.primaryGold} strokeWidth={1.5} />
                </View>
              </Animated.View>
              <Text style={styles.heroTitle}>{STEPS[currentStep]?.text || 'Generating...'}</Text>
              <Text style={styles.heroSub}>
                Step {currentStep + 1} of {STEPS.length}
              </Text>

              <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                  <Animated.View
                    style={[styles.progressFill, { width: progressWidth }]}
                  />
                </View>
                <Text style={styles.progressPercent}>
                  {Math.round(((currentStep + 1) / STEPS.length) * 100)}%
                </Text>
              </View>
            </>
          )}

          {state === 'success' && (
            <>
              <Animated.View style={{ transform: [{ scale: checkScale }] }}>
                <View style={[styles.heroIconContainer, styles.heroIconSuccess]}>
                  <Icon name={IconName.Heart} size={48} color={Colors.success} strokeWidth={1.5} />
                </View>
              </Animated.View>
              <Text style={styles.heroTitle}>Your Trip is Ready</Text>
              <Text style={styles.heroSub}>
                We've created a personalized 7-day itinerary for San Francisco with handpicked stays and activities.
              </Text>
            </>
          )}

          {state === 'error' && (
            <>
              <View style={[styles.heroIconContainer, styles.heroIconError]}>
                <Icon name={IconName.Heart} size={48} color={Colors.error} strokeWidth={1.5} />
              </View>
              <Text style={styles.heroTitle}>Generation Failed</Text>
              <Text style={styles.heroSub}>
                Something went wrong while creating your itinerary. Please try again.
              </Text>
            </>
          )}

          {state === 'cancelled' && (
            <>
              <View style={styles.heroIconContainer}>
                <Icon name={IconName.Compass} size={48} color={Colors.muted} strokeWidth={1.5} />
              </View>
              <Text style={styles.heroTitle}>Generation Cancelled</Text>
              <Text style={styles.heroSub}>
                No worries! You can start again whenever you're ready.
              </Text>
            </>
          )}
        </View>

        {state === 'idle' && (
          <View style={styles.preferencesCard}>
            <Text style={styles.prefsTitle}>Trip Details</Text>
            <View style={styles.prefRow}>
              <Icon name={IconName.MapPin} size={16} color={Colors.primary} />
              <Text style={styles.prefLabel}>Destination</Text>
              <Text style={styles.prefValue}>San Francisco, CA</Text>
            </View>
            <View style={styles.prefDivider} />
            <View style={styles.prefRow}>
              <Icon name={IconName.Calendar} size={16} color={Colors.primary} />
              <Text style={styles.prefLabel}>Dates</Text>
              <Text style={styles.prefValue}>Jun 15 – 22</Text>
            </View>
            <View style={styles.prefDivider} />
            <View style={styles.prefRow}>
              <Icon name={IconName.Users} size={16} color={Colors.primary} />
              <Text style={styles.prefLabel}>Travelers</Text>
              <Text style={styles.prefValue}>2 guests</Text>
            </View>
            <View style={styles.prefDivider} />
            <View style={styles.prefRow}>
              <Icon name={IconName.DollarSign} size={16} color={Colors.primary} />
              <Text style={styles.prefLabel}>Budget</Text>
              <Text style={styles.prefValue}>$150/night</Text>
            </View>
          </View>
        )}

        {state === 'success' && (
          <View style={styles.tripPreview}>
            <View style={styles.tripPreviewRow}>
              <View style={styles.tripStat}>
                <Text style={styles.tripStatValue}>7</Text>
                <Text style={styles.tripStatLabel}>Days</Text>
              </View>
              <View style={styles.tripStatDivider} />
              <View style={styles.tripStat}>
                <Text style={styles.tripStatValue}>5</Text>
                <Text style={styles.tripStatLabel}>Places</Text>
              </View>
              <View style={styles.tripStatDivider} />
              <View style={styles.tripStat}>
                <Text style={styles.tripStatValue}>$1K</Text>
                <Text style={styles.tripStatLabel}>Est. Cost</Text>
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
            icon={<Icon name={IconName.Compass} size={18} color={Colors.white} />}
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
            icon={<Icon name={IconName.ChevronRight} size={18} color={Colors.white} />}
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
    backgroundColor: Colors.background,
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
    backgroundColor: Colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  heroIconSuccess: {
    backgroundColor: '#E8F5E9',
  },
  heroIconError: {
    backgroundColor: '#FFF0F0',
  },
  heroTitle: {
    ...Typography.h1,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  heroSub: {
    ...Typography.body,
    color: Colors.textSecondary,
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
    backgroundColor: Colors.surfaceSubtle,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: Colors.primaryGold,
  },
  progressPercent: {
    ...Typography.caption,
    color: Colors.textTertiary,
    fontWeight: '600',
  },

  // Preferences card
  preferencesCard: {
    marginHorizontal: Spacing.xxl,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    ...Shadows.sm,
  },
  prefsTitle: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
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
    color: Colors.textSecondary,
    flex: 1,
  },
  prefValue: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  prefDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },

  // Trip preview
  tripPreview: {
    marginHorizontal: Spacing.xxl,
    backgroundColor: Colors.white,
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
    color: Colors.primary,
  },
  tripStatLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  tripStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },

  // Bottom
  bottomActions: {
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.lg,
  },
});
