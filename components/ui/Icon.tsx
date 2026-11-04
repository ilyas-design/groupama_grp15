import {
  AlertTriangle, ArrowRight, ArrowUpRight, Award, BadgeCheck, BarChart3, Bell, BookOpen, Bot, Brain, Briefcase,
  Calendar, Car, Check, CheckCircle2, ChevronDown, ChevronRight, Clock, CloudHail, CloudRain, CloudSun, Compass,
  Droplet, Droplets, Eye, FileCheck, FileSearch, FileText, Flower2, GraduationCap, Hammer, HandHeart, Handshake,
  Heart, HelpCircle, Home, Lightbulb, Lock, Mail, Map, MessageCircle, MessageSquare, Mic, Network, Pencil, Play,
  RefreshCw, Repeat, Scale, Search, Send, Settings, Shield, ShieldCheck, Sparkles, Sprout, Star, Sun, Sunrise,
  Target, ThumbsUp, Timer, Tractor, Trees, TreeDeciduous, TrendingUp, User, UserCheck, Users, Waves, Wheat, Wind,
  X, Zap, Leaf, Building2, Thermometer, Flame, Quote, Info, Ban, Recycle, Gauge, ListChecks, Menu, Copy, ArrowLeft, MapPin,
  type LucideIcon, type LucideProps,
} from 'lucide-react';

/**
 * Registre d'icônes référençables par NOM depuis /content
 * (une fonction composant ne peut pas traverser la frontière serveur → client).
 */
export const iconRegistry = {
  AlertTriangle, ArrowRight, ArrowUpRight, Award, BadgeCheck, BarChart3, Bell, BookOpen, Bot, Brain, Briefcase,
  Calendar, Car, Check, CheckCircle2, ChevronDown, ChevronRight, Clock, CloudHail, CloudRain, CloudSun, Compass,
  Droplet, Droplets, Eye, FileCheck, FileSearch, FileText, Flower2, GraduationCap, Hammer, HandHeart, Handshake,
  Heart, HelpCircle, Home, Lightbulb, Lock, Mail, Map, MessageCircle, MessageSquare, Mic, Network, Pencil, Play,
  RefreshCw, Repeat, Scale, Search, Send, Settings, Shield, ShieldCheck, Sparkles, Sprout, Star, Sun, Sunrise,
  Target, ThumbsUp, Timer, Tractor, Trees, TreeDeciduous, TrendingUp, User, UserCheck, Users, Waves, Wheat, Wind,
  X, Zap, Leaf, Building2, Thermometer, Flame, Quote, Info, Ban, Recycle, Gauge, ListChecks, Menu, Copy, ArrowLeft, MapPin,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
}

/** Icône décorative par défaut (aria-hidden). Passer aria-label pour une icône porteuse de sens. */
export function Icon({ name, strokeWidth = 1.75, ...rest }: IconProps) {
  const Cmp = iconRegistry[name];
  const decorative = !rest['aria-label'];
  return <Cmp strokeWidth={strokeWidth} aria-hidden={decorative || undefined} focusable="false" {...rest} />;
}
