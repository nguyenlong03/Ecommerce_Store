import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowLeft,
  CreditCard,
  Truck,
} from "lucide-react";
import { removeFromCart, updateCartQuantity, clearCart } from '../redux/actions';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, totalItems, totalPrice } = useSelector(state => state.cart);

  const handleUpdateQuantity = (id, newQuantity) => {
    dispatch(updateCartQuantity(id, newQuantity));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate order summary
  const subtotal = totalPrice;
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 text-gray-300 mb-6">
              <ShoppingCart className="h-full w-full" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-gray-600 mb-8">
              Bạn chưa thêm sản phẩm nào vào giỏ hàng.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Giỏ hàng
              </h1>
              <p className="text-gray-600 mt-2">
                {totalItems} sản phẩm trong giỏ hàng
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Xóa tất cả
              </button>
              <Link
                to="/products"
                className="inline-flex items-center text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Sản phẩm trong giỏ
                </h2>
              </div>
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 flex items-center space-x-4"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || "https://via.placeholder.com/300x300?text=No+Image"}
                        alt={item.name || item.title}
                        className="h-24 w-24 rounded-lg object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {item.name || item.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <span>Danh mục: {item.category || "Tổng hợp"}</span>
                        {item.brand && <span>Thương hiệu: {item.brand}</span>}
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        ${item.price?.toFixed(2) || "0.00"}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center text-lg font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ${((item.price || 0) * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 mt-2 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border sticky top-8">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Tóm tắt đơn hàng
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">MIỄN PHÍ</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Thuế</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Tổng cộng</span>
                    <span className="text-lg font-semibold text-blue-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-700">
                      <Truck className="h-4 w-4 inline mr-1" />
                      Mua thêm ${(100 - subtotal).toFixed(2)} để được miễn phí vận chuyển!
                    </p>
                  </div>
                )}

                <Link
                  to="/checkout"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Thanh toán
                </Link>

                <div className="text-center">
                  <Link
                    to="/products"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Tiếp tục mua sắm
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Tại sao chọn chúng tôi?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <Truck className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">
                    Miễn phí vận chuyển đơn hàng trên $100
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-600">
                    Thanh toán an toàn
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 rounded-full p-2">
                    <ShoppingCart className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-600">
                    Chính sách đổi trả 30 ngày
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
