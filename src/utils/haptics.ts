import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export async function hapticLight() {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch {}
}

export async function hapticMedium() {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch {}
}

export async function hapticHeavy() {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } catch {}
}

export async function hapticSelection() {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.selectionAsync();
  } catch {}
}

export async function hapticSuccess() {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch {}
}
