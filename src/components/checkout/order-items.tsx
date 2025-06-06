"use client";
import { useCurrency } from "@/app/context/currencyContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderItemsProps } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaClock } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";

/**
 * A component that displays a list of items in a shopping cart/order with various interactive features
 *
 * @component
 * @param {Object} props - The component props
 * @param {CartItem[]} props.cartItems - Array of cart items to display
 * @param {boolean} [props.editable=false] - Whether the items can be edited (quantity updates/removal)
 * @param {Function} [props.onUpdateQuantity] - Callback when item quantity is updated, receives item id and new quantity
 * @param {Function} [props.onRemoveItem] - Callback when item is removed, receives item id
 *
 * @returns React component that renders:
 * - Collapsible list of order items with images and details
 * - Item count and limited availability warnings
 * - Price display with sale price handling
 * - Quantity controls and remove buttons when editable
 * - Empty cart state
 * - Badges for limited stock and new arrivals
 */
export default function OrderItems({
  cartItems,
  editable = false,
  onUpdateQuantity,
  onRemoveItem,
}: OrderItemsProps) {
  const [showItems, setShowItems] = useState(true);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b ">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-1">
              <span className="hidden sm:inline">Order</span> Items
              <span className="ml-2">({totalItems})</span>
            </h2>
            {cartItems.some((item) => item.isLimited) && (
              <p className="text-sm text-amber-600 flex items-center mt-1">
                <FaClock className="h-4 w-4 mr-1" />
                Some items in your order have limited availability
              </p>
            )}
          </div>
          <button onClick={() => setShowItems(!showItems)}>
            {showItems ? (
              <FaChevronUp className="h-5 w-5" />
            ) : (
              <FaChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {showItems && (
        <div className="divide-y">
          {cartItems.map((item) => (
            <div key={item.id} className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border ">
                  <Image
                    src={item.imageSrc}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover object-center"
                  />
                  {item.isOnSale && (
                    <div className="absolute top-0 left-0 bg-red-500 text-foreground text-xs font-bold px-1 py-0.5">
                      SALE
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-base font-medium">{item.name}</h3>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        {item.color && <p>Color: {item.color}</p>}
                        {item.size && <p>Size: {item.size}</p>}
                        {item.options &&
                          item.options.map((option, idx) => (
                            <p key={idx}>
                              {option.name}: {option.value}
                            </p>
                          ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center">
                        {item.originalPrice &&
                        Number(item.originalPrice) > Number(item.price) ? (
                          <>
                            <p className="text-sm line-through mr-2">
                              {formatCurrency(
                                item.originalPrice,
                                selectedCurrency.code
                              )}
                            </p>
                            <p className="text-base font-medium text-red-600">
                              {formatCurrency(
                                Number(item.price),
                                selectedCurrency.code
                              )}
                            </p>
                          </>
                        ) : (
                          <p className="text-base font-medium">
                            {formatCurrency(
                              Number(item.price),
                              selectedCurrency.code
                            )}
                          </p>
                        )}
                      </div>
                      <p className="text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>

                  <div className="mt-2 flex justify-between">
                    <div className="flex flex-wrap gap-2">
                      {item.isLimited && (
                        <Badge
                          variant="outline"
                          className="text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100 flex items-center"
                        >
                          <FaClock className="h-3 w-3 mr-1" /> Limited Stock
                        </Badge>
                      )}
                      {item.isNew && (
                        <Badge
                          variant="outline"
                          className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100"
                        >
                          New Arrival
                        </Badge>
                      )}
                    </div>

                    {editable && (
                      <div className="flex items-center space-x-2">
                        {onUpdateQuantity && (
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="px-2 py-1"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-2 py-1"
                            >
                              +
                            </button>
                          </div>
                        )}

                        {onRemoveItem && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-sm text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!showItems && cartItems.length > 2 && (
        <div className="px-6 py-4 text-center text-sm">
          {cartItems.length} items in your order.
          <button
            onClick={() => setShowItems(true)}
            className="ml-1 text-blue-600 hover:underline"
          >
            Show all
          </button>
        </div>
      )}

      {cartItems.length === 0 && (
        <div className="p-6 text-center">
          <div className="flex flex-col items-center">
            <IoIosAlert className="h-10 w-10 text-gray-400 mb-4" />
            <h3 className="text-gray-800 font-medium text-lg mb-1">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-4">
              Add some items to your cart to proceed with checkout
            </p>
            <Button className="bg-primary text-primary-foreground">
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
