import { Crown, Star, User, Zap } from "lucide-react";

export const getTierColor = (tierName?: string) => {
  switch (tierName?.toLowerCase()) {
    case "basic":
      return "bg-blue-500";
    case "premium":
      return "bg-purple-500";
    case "vip":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

export const getTierIcon = (tierName?: string) => {
  switch (tierName?.toLowerCase()) {
    case "basic":
      return <Star className="w-5 h-5" />;
    case "premium":
      return <Zap className="w-5 h-5" />;
    case "vip":
      return <Crown className="w-5 h-5" />;
    default:
      return <User className="w-5 h-5" />;
  }
};

export const getTierBadgeVariant = (tierName: string) => {
  switch (tierName.toLowerCase()) {
    case "basic":
      return "gradient";
    case "premium":
      return "platinum";
    case "vip":
      return "premium";
    default:
      return "outline";
  }
};
