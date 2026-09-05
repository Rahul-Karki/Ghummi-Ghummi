import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius, Shadows } from '../theme/colors';
import { Icon, IconName } from './Icon';
import { hapticLight } from '../utils/haptics';

const { height: SCREEN_H } = Dimensions.get('window');

type BottomSheetProps = {
  visible: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: number[];
};

export function BottomSheet({
  visible,
  title,
  onClose,
  children,
  snapPoints = [70],
}: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(SCREEN_H)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(sheetTranslateY, {
          toValue: 0,
          damping: 20,
          stiffness: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: SCREEN_H,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[styles.overlay, { opacity: overlayOpacity }]}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.sheet,
          {
            maxHeight: `${snapPoints[0]}%`,
            paddingBottom: Math.max(insets.bottom, Spacing.xl),
            transform: [{ translateY: sheetTranslateY }],
          },
        ]}
      >
        <View style={styles.handle} />

        {title && (
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
              onPress={() => {
                hapticLight();
                onClose();
              }}
              style={styles.closeBtn}
              accessibilityLabel="Close"
            >
              <Icon name={IconName.Search} size={16} color={Colors.muted} />
            </TouchableOpacity>
          </View>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {children}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFill,
    zIndex: 2000,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.overlay,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.md,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.mutedFaint,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingBottom: Spacing.lg,
  },
});
