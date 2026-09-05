import React from 'react';
import {
  MapPin,
  Search,
  User,
  Home,
  Heart,
  Plane,
  SlidersHorizontal,
  ArrowLeft,
  Star,
  ChevronRight,
  Compass,
  Building2,
  TreePine,
  Waves,
  Users,
  DollarSign,
  Grid3X3,
  Filter,
  Navigation,
  Phone,
  Mail,
  Share2,
  Bookmark,
  Calendar,
  Clock,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Dumbbell,
  WavesLadder,
  Image,
  RefreshCw,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react-native';
import { Colors } from '../theme/colors';

export const IconName = {
  MapPin,
  Search,
  User,
  Home,
  Heart,
  Plane,
  SlidersHorizontal,
  ArrowLeft,
  Star,
  ChevronRight,
  Compass,
  Building2,
  TreePine,
  Waves,
  Users,
  DollarSign,
  Grid3X3,
  Filter,
  Navigation,
  Phone,
  Mail,
  Share2,
  Bookmark,
  Calendar,
  Clock,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Dumbbell,
  WavesLadder,
  Image,
  RefreshCw,
  AlertTriangle,
} as const;

type IconProps = {
  name: LucideIcon;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: any;
};

export function Icon({
  name: IconComponent,
  size = 18,
  color = Colors.black,
  strokeWidth = 1.8,
  style,
}: IconProps) {
  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      style={style}
    />
  );
}
