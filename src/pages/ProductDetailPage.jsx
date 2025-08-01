import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ChevronRight,
  Check,
} from "lucide-react";

import { getProductById } from "../api/Productjs";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await getProductById(id);
        const productData = response.data || response;
        setProduct(productData);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError("Failed to load product");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Product not found
        </h2>
        <p className="text-gray-600 mb-8">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );
  };

  // Use images from API response
  const productImages = product.images || [product.image];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link
            to="/products"
            className="hover:text-blue-600 transition-colors"
          >
            Products
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link
            to={`/products?category=${product.category}`}
            className="hover:text-blue-600 transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product images */}
          <div>
            <div className="mb-4 overflow-hidden rounded-lg">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden rounded-md ${
                    selectedImage === index
                      ? "ring-2 ring-blue-500"
                      : "ring-1 ring-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product details */}
          <div className="mt-10 lg:mt-0 lg:ml-8">
            {product.discount > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-rose-100 text-rose-800">
                Sale
              </span>
            )}

            <h1 className="text-3xl font-bold text-gray-900 mt-2">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center">
                {product.discount > 0 ? (
                  <>
                    <p className="text-3xl font-bold text-gray-900 mr-3">
                      $
                      {(
                        (product.price * (100 - product.discount)) /
                        100
                      ).toFixed(2)}
                    </p>
                    <p className="text-lg text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="ml-3 text-sm font-medium text-rose-600">
                      Save {product.discount}%
                    </p>
                  </>
                ) : (
                  <p className="text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={rating}
                      className={`h-5 w-5 ${
                        product.rating > rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500">
                  {product.reviews} reviews
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700 space-y-6">
                {product.description}
              </p>
            </div>

            {/* Stock availability */}
            <div className="mt-6 flex items-center">
              <Check className="h-5 w-5 text-green-500" />
              <p className="ml-2 text-sm text-gray-700">
                In stock and ready to ship
              </p>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 focus:outline-none focus:text-blue-600 p-2"
                  disabled={quantity <= 1}
                >
                  <span className="sr-only">Decrease quantity</span>
                  <span className="text-2xl">−</span>
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="mx-2 w-16 text-center border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 focus:outline-none focus:text-blue-600 p-2"
                >
                  <span className="sr-only">Increase quantity</span>
                  <span className="text-2xl">+</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md flex items-center justify-center transition-colors"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>

              <button className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Heart className="h-5 w-5 mr-2" />
                Add to Wishlist
              </button>
            </div>

            {/* Share */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex items-center">
                <Share2 className="h-5 w-5 text-gray-500" />
                <span className="ml-2 text-sm text-gray-500">
                  Share this product
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
