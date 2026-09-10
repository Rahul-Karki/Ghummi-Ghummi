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
  Shield,
  CreditCard,
  Bell,
  Globe,
  HelpCircle,
  Moon,
  Sun,
  Check,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  X,
  Edit3,
  Trash2,
  Wallet,
  Route,
  Maximize2,
  Minimize2,
  LocateFixed,
  type LucideIcon,
} from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

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
  Shield,
  CreditCard,
  Bell,
  Globe,
  HelpCircle,
  Moon,
  Sun,
  Check,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  X,
  Edit3,
  Trash2,
  Wallet,
  Route,
  Maximize2,
  Minimize2,
  LocateFixed,
} as const;

type IconProps = {
  name: LucideIcon;
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
  style?: any;
};

export function Icon({
  name: IconComponent,
  size = 18,
  color,
  strokeWidth = 1.8,
  fill,
  style,
}: IconProps) {
  const { colors } = useTheme();
  const finalColor = color || colors.textPrimary;
  return (
    <IconComponent
      size={size}
      color={finalColor}
      strokeWidth={strokeWidth}
      fill={fill || 'transparent'}
      style={style}
    />
  );
}
