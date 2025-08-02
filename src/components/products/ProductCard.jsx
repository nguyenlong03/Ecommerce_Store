import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions";
import { toast } from "react-toastify";
import { scrollToTop } from "../../hooks/useScrollToTop";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const productToAdd = {
        id: product.id,
        title: product.title || product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: 1,
      };

      dispatch(addToCart(productToAdd));

      // Show success notification with unique toastId to prevent duplicates
      const toastId = `add-cart-${product.id}-${Date.now()}`;
      if (!toast.isActive(toastId)) {
        toast.success(
          `Đã thêm ${(product.name || product.title).substring(
            0,
            30
          )}... vào giỏ hàng!`,
          {
            toastId: toastId,
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          }
        );
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Không thể thêm sản phẩm vào giỏ hàng", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(
      isLiked
        ? "Đã xóa khỏi danh sách yêu thích"
        : "Đã thêm vào danh sách yêu thích",
      { autoClose: 1000 }
    );
  };

  const handleViewDetails = () => {
    scrollToTop();
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 card-hover">
      {/* Badge */}
      {product.discount && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 animate-pulse">
          -{product.discount}%
        </div>
      )}

      {/* Wishlist button */}
      <button
        onClick={handleLike}
        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${
          isLiked
            ? "bg-red-100 text-red-500 scale-110"
            : "bg-white/80 text-gray-600 hover:bg-red-100 hover:text-red-500 opacity-0 group-hover:opacity-100"
        } backdrop-blur-sm shadow-lg hover:scale-110`}
      >
        <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
      </button>

      <Link
        to={`/products/${product.id}`}
        onClick={handleViewDetails}
        className="block"
      >
        {/* Product Image */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square">
          <img
            src={
              product.image ||
              product.images?.[0] ||
              "https://via.placeholder.com/400x400?text=No+Image"
            }
            alt={product.name || product.title}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x400?text=No+Image";
            }}
          />

          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="loading-spinner"></div>
            </div>
          )}

          {/* Overlay with quick actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex space-x-3">
              <button
                onClick={handleAddToCart}
                className="bg-white text-gray-900 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
              <Link
                to={`/products/${product.id}`}
                onClick={handleViewDetails}
                className="bg-white text-gray-900 p-3 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <Eye className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Category */}
          <div className="text-sm text-blue-600 font-medium mb-2 uppercase tracking-wide">
            {product.category || "General"}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name || product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating?.rate || 4.5)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({product.rating?.count || 127})
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${product.price?.toFixed(2) || "0.00"}
              </span>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Link>

      {/* Floating label for new products */}
      {product.isNew && (
        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          Mới
        </div>
      )}
    </div>
  );
};

export default ProductCard;
