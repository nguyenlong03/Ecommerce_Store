import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../api/Productjs";
import { scrollToTop } from "../../hooks/useScrollToTop";

const SearchDropdown = ({ isMobile = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Load all products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getAllProducts();
        setAllProducts(response);
      } catch (error) {
        console.error("Error loading products for search:", error);
      }
    };
    loadProducts();
  }, []);

  // Handle search input changes
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filteredProducts = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filteredProducts.slice(0, 5)); // Limit to 5 suggestions
      setIsDropdownOpen(true);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  }, [searchQuery, allProducts]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(
        searchQuery.trim()
      )}`;
    }
  };

  const handleSuggestionClick = () => {
    setSearchQuery("");
    setIsDropdownOpen(false);
    scrollToTop();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  const truncateText = (text, maxLength = 50) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className={`relative ${isMobile ? "w-full" : "flex-1 max-w-lg"}`}>
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          ref={searchRef}
          type="text"
          placeholder="Tìm kiếm tên sản phẩm "
          className={`w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
            isMobile ? "text-sm" : ""
          }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsDropdownOpen(true);
            }
          }}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {/* Search Suggestions Dropdown */}
      {isDropdownOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className={`absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto ${
            isMobile ? "mx-0" : ""
          }`}
        >
          <div className="py-2">
            {/* Search Results Header */}
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm text-gray-600">
                Tìm thấy {suggestions.length} sản phẩm cho "{searchQuery}"
              </p>
            </div>

            {/* Product Suggestions */}
            {suggestions.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                onClick={handleSuggestionClick}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                    {truncateText(product.title, isMobile ? 30 : 50)}
                  </p>
                  <p className="text-xs text-gray-500 capitalize mt-1">
                    {product.category}
                  </p>
                  <p className="text-sm font-semibold text-blue-600 mt-1">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))}

            {/* View All Results */}
            {suggestions.length === 5 && (
              <div className="px-4 py-3 border-t border-gray-100">
                <Link
                  to={`/products?search=${encodeURIComponent(searchQuery)}`}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={handleSuggestionClick}
                >
                  Xem tất cả kết quả tìm kiếm →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {isDropdownOpen && searchQuery.trim() && suggestions.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1"
        >
          <div className="px-4 py-6 text-center">
            <Search className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Không tìm thấy sản phẩm nào</p>
            <p className="text-xs text-gray-400 mt-1">
              Thử tìm kiếm với từ khóa khác
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
