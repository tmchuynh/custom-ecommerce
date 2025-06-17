import {
  Clock,
  Package,
  Truck,
  CheckCircle,
  X,
  AlertCircle,
} from "lucide-react";

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "outlineGradientSecondary";
    case "processing":
      return "outlineGradientInfo";
    case "shipped":
      return "outlineGradientPrimary";
    case "delivered":
      return "outlineGradientSuccess";
    case "cancelled":
      return "outlineGradientDanger";
    default:
      return "outlineGradient";
  }
};

export const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case "processing":
      return <Package className="w-5 h-5 text-blue-500" />;
    case "shipped":
      return <Truck className="w-5 h-5 text-purple-500" />;
    case "delivered":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "cancelled":
      return <X className="w-5 h-5 text-red-500" />;
    default:
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
  }
};
