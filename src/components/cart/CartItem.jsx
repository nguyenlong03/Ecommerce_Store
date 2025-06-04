import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center py-6 border-b border-gray-200">
      {/* Product image */}
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product details */}
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
          <p className="text-base font-medium text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-1">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          {/* Quantity controls */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="px-2 py-1 text-gray-600 hover:text-blue-600 disabled:opacity-50"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-1 text-gray-800">{item.quantity}</span>
            <button
              onClick={() => increaseQuantity(item.id)}
              className="px-2 py-1 text-gray-600 hover:text-blue-600"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Remove button */}
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-gray-500 hover:text-rose-500 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
