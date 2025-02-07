import { BadgeCheck, Crown, Flame, Gift, Leaf, Star, TriangleAlert } from 'lucide-react';

export const companyIcons: Record<string, React.ElementType> = {
    warning: TriangleAlert,
    promotion: Gift,
    newListing: Leaf,
    bestRates: Crown,
    topRates: Star,
    trending: Flame,
    verified: BadgeCheck,
  };
