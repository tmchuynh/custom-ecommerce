"use client";

import { useCart } from "../context/cartContext";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } =
    useCart(); // Access cart data

  const handleUpdateQuantity = (id: number, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-xl text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col gap-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 py-6"
              >
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg">
                    Image Here
                  </div>
                  <div className="text-lg font-medium text-gray-900">
                    {item.name}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 text-center border border-gray-300 rounded-md"
                  />
                  <div className="text-lg font-medium text-gray-900">
                    ${item.price * item.quantity}
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center border-t border-gray-200 pt-6">
            <div className="text-lg font-medium text-gray-900">Total:</div>
            <div className="text-xl font-bold text-gray-900">
              ${getTotalPrice().toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
