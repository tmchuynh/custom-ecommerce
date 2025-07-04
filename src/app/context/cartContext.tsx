"use client";

import { CartItem } from "@/lib/interfaces/cart";
import { ProductItem } from "@/lib/interfaces/product";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

export interface DiscountRule {
  code: string;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  conditions: {
    minItems?: number;
    maxItems?: number;
    requiredCategories?: string[];
    requiredBrands?: string[];
    minTotal?: number;
    maxUses?: number;
  };
  appliesTo: "cart" | "category" | "brand" | "specific-items";
  targetCategories?: string[];
  targetBrands?: string[];
  targetProductIds?: number[];
}
export interface AppliedDiscount {
  rule: DiscountRule;
  discountAmount: number;
  appliedItems: CartItem[];
}

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  appliedDiscount: AppliedDiscount | null;
  discountAmount: number;
  membershipDiscount: number;
  totalDiscountAmount: number;
  subtotalAfterDiscount: number;
  shippingFee: number;
  grandTotal: number;
  addToCart: (product: ProductItem, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  getCartItemQuantity: (productId: number) => number;
  applyDiscount: (code: string) => { success: boolean; message: string };
  removeDiscount: () => void;
  checkout: () => Promise<{ success: boolean; message: string }>;
  redirectToCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedDiscount, setAppliedDiscount] =
    useState<AppliedDiscount | null>(null);

  // Get auth context for membership discounts
  const auth = useAuth();
  const router = useRouter();

  // Predefined discount rules
  const discountRules: DiscountRule[] = [
    {
      code: "TECH20",
      name: "20% off Electronics",
      type: "percentage",
      value: 20,
      conditions: {
        minItems: 2,
        requiredCategories: ["laptops", "smartphones", "tablets"],
      },
      appliesTo: "category",
      targetCategories: ["laptops", "smartphones", "tablets"],
    },
    {
      code: "BULK15",
      name: "15% off 5+ items",
      type: "percentage",
      value: 15,
      conditions: {
        minItems: 5,
      },
      appliesTo: "cart",
    },
    {
      code: "BEAUTY10",
      name: "10% off Beauty Products",
      type: "percentage",
      value: 10,
      conditions: {
        minItems: 1,
        requiredCategories: ["beauty", "skincare", "fragrances"],
      },
      appliesTo: "category",
      targetCategories: ["beauty", "skincare", "fragrances"],
    },
    {
      code: "FASHION25",
      name: "25% off Fashion (3+ items)",
      type: "percentage",
      value: 25,
      conditions: {
        minItems: 3,
        requiredCategories: [
          "womens-dresses",
          "mens-shirts",
          "womens-shoes",
          "mens-shoes",
        ],
      },
      appliesTo: "category",
      targetCategories: [
        "womens-dresses",
        "mens-shirts",
        "womens-shoes",
        "mens-shoes",
      ],
    },
    {
      code: "SAVE50",
      name: "$50 off orders over $200",
      type: "fixed",
      value: 50,
      conditions: {
        minTotal: 200,
      },
      appliesTo: "cart",
    },
  ];

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("shopping-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }

    // Load applied discount from localStorage
    const savedDiscount = localStorage.getItem("applied-discount");
    if (savedDiscount) {
      try {
        const parsedDiscount = JSON.parse(savedDiscount);
        setAppliedDiscount(parsedDiscount);
        console.log(
          "Loaded discount from localStorage:",
          parsedDiscount.rule.code
        );
      } catch (error) {
        console.error("Error loading discount from localStorage:", error);
      }
    } else {
      console.log("No saved discount found in localStorage");
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(items));
  }, [items]);

  // Save applied discount to localStorage whenever it changes
  useEffect(() => {
    if (appliedDiscount) {
      localStorage.setItem("applied-discount", JSON.stringify(appliedDiscount));
    } else {
      localStorage.removeItem("applied-discount");
    }
  }, [appliedDiscount]);

  // Validate applied discount when cart items change
  useEffect(() => {
    if (appliedDiscount && items.length > 0) {
      // Re-validate the discount to ensure it's still valid
      const result = validateDiscount(appliedDiscount.rule);
      if (!result.isValid) {
        // If discount is no longer valid, remove it
        setAppliedDiscount(null);
        localStorage.removeItem("applied-discount");
        // Optionally show a message to user
        console.warn(
          `Discount ${appliedDiscount.rule.code} is no longer valid: ${result.reason}`
        );
      }
    } else if (appliedDiscount && items.length === 0) {
      // Keep discount even when cart is empty so it persists during navigation
      console.log(
        `Keeping discount ${appliedDiscount.rule.code} during navigation`
      );
    }
  }, [items]);

  // Discount validation helper function
  const validateDiscount = (
    rule: DiscountRule
  ): {
    isValid: boolean;
    reason?: string;
  } => {
    // Check conditions
    const totalQuantity = items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    if (rule.conditions.minItems && totalQuantity < rule.conditions.minItems) {
      return {
        isValid: false,
        reason: `Requires at least ${rule.conditions.minItems} items`,
      };
    }

    if (rule.conditions.maxItems && totalQuantity > rule.conditions.maxItems) {
      return {
        isValid: false,
        reason: `Only applies to ${rule.conditions.maxItems} or fewer items`,
      };
    }

    if (rule.conditions.minTotal) {
      const currentTotal = items.reduce((total, item) => {
        const itemPrice = item.discountPercentage
          ? item.price * (1 - item.discountPercentage / 100)
          : item.price;
        return total + itemPrice * item.quantity;
      }, 0);

      if (currentTotal < rule.conditions.minTotal) {
        return {
          isValid: false,
          reason: `Requires minimum order of $${rule.conditions.minTotal}`,
        };
      }
    }

    // Check category requirements
    if (
      rule.conditions.requiredCategories &&
      rule.conditions.requiredCategories.length > 0
    ) {
      const hasRequiredCategory = items.some((item) =>
        rule.conditions.requiredCategories!.includes(item.category)
      );

      if (!hasRequiredCategory) {
        return {
          isValid: false,
          reason: `Only applies to ${rule.conditions.requiredCategories.join(
            ", "
          )} items`,
        };
      }
    }

    // Check brand requirements
    if (
      rule.conditions.requiredBrands &&
      rule.conditions.requiredBrands.length > 0
    ) {
      const hasRequiredBrand = items.some(
        (item) =>
          item.brand && rule.conditions.requiredBrands!.includes(item.brand)
      );

      if (!hasRequiredBrand) {
        return {
          isValid: false,
          reason: `Only applies to ${rule.conditions.requiredBrands.join(
            ", "
          )} brands`,
        };
      }
    }

    return { isValid: true };
  };

  const addToCart = (product: ProductItem, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        const newCartItem: CartItem = {
          id: Date.now(), // Simple ID generation
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity,
          image: product.images?.[0] || product.thumbnail,
          category: product.category,
          thumbnail: product.thumbnail,
          discountPercentage: product.discountPercentage,
          brand: product.brand,
        };
        return [...prevItems, newCartItem];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (productId: number): boolean => {
    return items.some((item) => item.productId === productId);
  };

  const getCartItemQuantity = (productId: number): number => {
    const item = items.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  // Discount functions
  const applyDiscount = (
    code: string
  ): { success: boolean; message: string } => {
    const rule = discountRules.find(
      (r) => r.code.toLowerCase() === code.toLowerCase()
    );

    if (!rule) {
      return { success: false, message: "Invalid discount code" };
    }

    // Check conditions
    const totalQuantity = items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    if (rule.conditions.minItems && totalQuantity < rule.conditions.minItems) {
      return {
        success: false,
        message: `This discount requires at least ${rule.conditions.minItems} items in your cart`,
      };
    }

    if (rule.conditions.maxItems && totalQuantity > rule.conditions.maxItems) {
      return {
        success: false,
        message: `This discount only applies to carts with ${rule.conditions.maxItems} or fewer items`,
      };
    }

    if (rule.conditions.minTotal) {
      const currentTotal = items.reduce((total, item) => {
        const itemPrice = item.discountPercentage
          ? item.price * (1 - item.discountPercentage / 100)
          : item.price;
        return total + itemPrice * item.quantity;
      }, 0);

      if (currentTotal < rule.conditions.minTotal) {
        return {
          success: false,
          message: `This discount requires a minimum order of $${rule.conditions.minTotal}`,
        };
      }
    }

    // Check category requirements
    if (
      rule.conditions.requiredCategories &&
      rule.conditions.requiredCategories.length > 0
    ) {
      const hasRequiredCategory = items.some((item) =>
        rule.conditions.requiredCategories!.includes(item.category)
      );

      if (!hasRequiredCategory) {
        return {
          success: false,
          message: `This discount only applies to ${rule.conditions.requiredCategories.join(
            ", "
          )} items`,
        };
      }
    }

    // Check brand requirements
    if (
      rule.conditions.requiredBrands &&
      rule.conditions.requiredBrands.length > 0
    ) {
      const hasRequiredBrand = items.some(
        (item) =>
          item.brand && rule.conditions.requiredBrands!.includes(item.brand)
      );

      if (!hasRequiredBrand) {
        return {
          success: false,
          message: `This discount only applies to ${rule.conditions.requiredBrands.join(
            ", "
          )} brands`,
        };
      }
    }

    // Calculate discount
    let appliedItems: CartItem[] = [];
    let discountAmount = 0;

    if (rule.appliesTo === "cart") {
      appliedItems = [...items];
      const subtotal = items.reduce((total, item) => {
        const itemPrice = item.discountPercentage
          ? item.price * (1 - item.discountPercentage / 100)
          : item.price;
        return total + itemPrice * item.quantity;
      }, 0);

      if (rule.type === "percentage") {
        discountAmount = subtotal * (rule.value / 100);
      } else {
        discountAmount = rule.value;
      }
    } else if (rule.appliesTo === "category" && rule.targetCategories) {
      appliedItems = items.filter((item) =>
        rule.targetCategories!.includes(item.category)
      );
      const categorySubtotal = appliedItems.reduce((total, item) => {
        const itemPrice = item.discountPercentage
          ? item.price * (1 - item.discountPercentage / 100)
          : item.price;
        return total + itemPrice * item.quantity;
      }, 0);

      if (rule.type === "percentage") {
        discountAmount = categorySubtotal * (rule.value / 100);
      } else {
        discountAmount = rule.value;
      }
    } else if (rule.appliesTo === "brand" && rule.targetBrands) {
      appliedItems = items.filter(
        (item) => item.brand && rule.targetBrands!.includes(item.brand)
      );
      const brandSubtotal = appliedItems.reduce((total, item) => {
        const itemPrice = item.discountPercentage
          ? item.price * (1 - item.discountPercentage / 100)
          : item.price;
        return total + itemPrice * item.quantity;
      }, 0);

      if (rule.type === "percentage") {
        discountAmount = brandSubtotal * (rule.value / 100);
      } else {
        discountAmount = rule.value;
      }
    }

    const newAppliedDiscount = {
      rule,
      discountAmount,
      appliedItems,
    };

    setAppliedDiscount(newAppliedDiscount);

    // Immediately save to localStorage to ensure persistence
    localStorage.setItem(
      "applied-discount",
      JSON.stringify(newAppliedDiscount)
    );
    console.log("Saved discount to localStorage:", rule.code);

    return {
      success: true,
      message: `Discount "${rule.name}" applied successfully!`,
    };
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    // Immediately remove from localStorage
    localStorage.removeItem("applied-discount");
    console.log("Removed discount from localStorage");
  };

  const checkout = async (): Promise<{ success: boolean; message: string }> => {
    if (items.length === 0) {
      return { success: false, message: "Your cart is empty" };
    }

    try {
      // This is the legacy checkout for simple one-click checkout
      // For full checkout flow, use redirectToCheckout instead

      // Extract product IDs from cart items
      const productIds = items.map((item) => item.productId);

      // Emit custom event to notify wishlist context about purchase
      window.dispatchEvent(
        new CustomEvent("cart-checkout", {
          detail: { productIds },
        })
      );

      // Clear the cart after successful checkout
      clearCart();
      setAppliedDiscount(null);

      return {
        success: true,
        message: `Order placed successfully! Thank you for your purchase.`,
      };
    } catch (error) {
      console.error("Checkout error:", error);
      return {
        success: false,
        message: "Something went wrong during checkout. Please try again.",
      };
    }
  };

  const redirectToCheckout = () => {
    // Use Next.js router to navigate without losing state
    router.push("/checkout");
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => {
    const itemPrice = item.discountPercentage
      ? item.price * (1 - item.discountPercentage / 100)
      : item.price;
    return total + itemPrice * item.quantity;
  }, 0);

  // Calculate coupon discount amount
  const discountAmount = appliedDiscount ? appliedDiscount.discountAmount : 0;

  // Calculate membership discount amount (applied to total price)
  const membershipDiscountRate = auth?.hasMembership
    ? (auth.user?.membershipTier?.discountPercentage || 0) / 100
    : 0;
  const membershipDiscount = totalPrice * membershipDiscountRate;

  // Calculate total discount amount (coupon + membership)
  const totalDiscountAmount = discountAmount + membershipDiscount;

  // Calculate subtotal after all discounts
  const subtotalAfterDiscount = totalPrice - totalDiscountAmount;

  // Calculate 12% shipping fee (only if there are items in cart, applied to discounted total)
  // Free shipping for premium/VIP members
  const shippingFee = totalItems > 0 ? subtotalAfterDiscount * 0.12 : 0;

  // Calculate grand total (subtotal after discount + shipping)
  const grandTotal = subtotalAfterDiscount + shippingFee;

  const contextValue: CartContextType = {
    items,
    totalItems,
    totalPrice,
    appliedDiscount,
    discountAmount,
    membershipDiscount,
    totalDiscountAmount,
    subtotalAfterDiscount,
    shippingFee,
    grandTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartItemQuantity,
    applyDiscount,
    removeDiscount,
    checkout,
    redirectToCheckout,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartContext;
