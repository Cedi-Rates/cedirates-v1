import { BadgeCheck, Crown, Flame, Gift, Leaf, Star, TriangleAlert } from 'lucide-react';

export const companyIcons: Record<string, React.ElementType> = {
  verified: BadgeCheck,
    warning: TriangleAlert,
    promotion: Gift,
    newListing: Leaf,
    bestRates: Crown,
    topRates: Star,
    trending: Flame,
  };

  export const iconColors: Record<string, string> = {
    verified: "#1896FE",      // blue for verified
    warning: "#EE404C",     // red for warning
    promotion: "#EE404C",    // --- red for promotions
    newListing: "#388E3C",    // green for new listings
    bestRates: "#FFC107",      // yellow for best rates
    topRates: "#FFC107",     // yellow for top rates
    trending: "#F97316",     // orange for trending rates
  };
  