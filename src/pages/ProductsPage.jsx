import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/products/ProductGrid";
import { getAllProducts, getProductsByCategory } from "../api/Productjs";
import { Search, Filter, X, Sparkles, ShoppingBag, Star } from "lucide-react";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get category and search query from URL params
  const categoryFromUrl = searchParams.get("category");
  const searchFromUrl = searchParams.get("search");

  // Fetch all products and extract categories
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let productsData;

        // If there's a category in URL, fetch products for that category
        if (categoryFromUrl && categoryFromUrl !== "all") {
          const response = await getProductsByCategory(categoryFromUrl);
          productsData = response.data || response;
          setSelectedCategory(categoryFromUrl);
        } else {
          const response = await getAllProducts();
          productsData = response.data || response;
          setSelectedCategory("all");
        }

        setAllProducts(productsData);
        setFilteredProducts(productsData);

        // Set search term from URL if present
        if (searchFromUrl) {
          setSearchTerm(searchFromUrl);
        }

        // Extract unique categories from all products for filter
        const allProductsResponse = await getAllProducts();
        const allProductsData = allProductsResponse.data || allProductsResponse;
        const uniqueCategories = [
          ...new Set(allProductsData.map((product) => product.category)),
        ];
        setCategories(uniqueCategories.filter(Boolean));
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setAllProducts([]);
        setFilteredProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFromUrl, searchFromUrl]);

  // Handle search and filter
  useEffect(() => {
    let filtered = [...allProducts];

    // Apply search filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.title?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, allProducts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setLoading(true);

    try {
      let productsData;

      if (category === "all") {
        // Remove category from URL
        searchParams.delete("category");
        setSearchParams(searchParams);

        const response = await getAllProducts();
        productsData = response.data || response;
      } else {
        // Add category to URL
        setSearchParams({ ...Object.fromEntries(searchParams), category });

        const response = await getProductsByCategory(category);
        productsData = response.data || response;
      }

      setAllProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.error("Failed to fetch products by category:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilters = async () => {
    setSearchTerm("");
    setSelectedCategory("all");

    // Remove category from URL
    searchParams.delete("category");
    setSearchParams(searchParams);

    // Fetch all products
    setLoading(true);
    try {
      const response = await getAllProducts();
      const productsData = response.data || response;
      setAllProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.error("Failed to fetch all products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get category display name
  const getCategoryDisplayName = (category) => {
    const displayNames = {
      electronics: "Điện tử",
      jewelery: "Trang sức",
      "men's clothing": "Thời trang Nam",
      "women's clothing": "Thời trang Nữ",
    };
    return displayNames[category] || category;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <ShoppingBag className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Category/Search breadcrumb */}
            {((categoryFromUrl && categoryFromUrl !== "all") || searchFromUrl) && (
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">
                  {categoryFromUrl && categoryFromUrl !== "all" && (
                    <>Danh mục: {getCategoryDisplayName(categoryFromUrl)}</>
                  )}
                  {searchFromUrl && (
                    <>Tìm kiếm: "{searchFromUrl}"</>
                  )}
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  Đang tải sản phẩm...
                </span>
              ) : searchFromUrl ? (
                <>
                  Kết quả tìm kiếm
                  <br />
                  <span className="text-2xl md:text-3xl">"{searchFromUrl}"</span>
                </>
              ) : categoryFromUrl && categoryFromUrl !== "all" ? (
                <>
                  {getCategoryDisplayName(categoryFromUrl)}
                  <br />
                  <span className="text-2xl md:text-3xl">Collection</span>
                </>
              ) : (
                "Khám phá sản phẩm tuyệt vời"
              )}
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {!loading &&
                (searchFromUrl 
                  ? `Tìm thấy ${filteredProducts.length} sản phẩm cho "${searchFromUrl}"`
                  : categoryFromUrl && categoryFromUrl !== "all"
                  ? `Khám phá ${
                      allProducts.length
                    } sản phẩm trong danh mục ${getCategoryDisplayName(
                      categoryFromUrl
                    )}`
                  : `Khám phá bộ sưu tập ${allProducts.length} sản phẩm cao cấp của chúng tôi`)}
            </p>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-300" />
                <span className="text-sm font-medium">
                  Premium Quality Guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Search and Filter Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-2">
              <Search className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Find Your Perfect Product
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Enhanced Search Input */}
            <div className="flex-1">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                  <input
                    type="text"
                    placeholder="Search for amazing products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-gray-900 bg-white/80 backdrop-blur-sm transition-all duration-300 text-lg font-medium placeholder-gray-400"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors z-10"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Category Filter */}
            <div className="lg:w-80">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full py-4 px-6 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 text-gray-900 bg-white/80 backdrop-blur-sm transition-all duration-300 text-lg font-medium appearance-none cursor-pointer"
                >
                  <option value="all">🌟 All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      📦 {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Clear Filters Button */}
            {(searchTerm || selectedCategory !== "all") && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium"
              >
                <X className="h-5 w-5" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Quick Category Filter */}
        {!loading && categories.length > 0 && (
          <div className="mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Quick Categories
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === "all"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                      : "bg-white/80 text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md backdrop-blur-sm"
                  }`}
                >
                  {selectedCategory === "all" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30 animate-pulse"></div>
                  )}
                  <span className="relative flex items-center gap-2">
                    🌟 All Products
                    {selectedCategory === "all" && (
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {allProducts.length}
                      </span>
                    )}
                  </span>
                </button>
                {categories.map((category) => {
                  const categoryCount = allProducts.filter(
                    (p) => p.category === category
                  ).length;
                  return (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                          : "bg-white/80 text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:shadow-md backdrop-blur-sm"
                      }`}
                    >
                      {selectedCategory === category && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-30 animate-pulse"></div>
                      )}
                      <span className="relative flex items-center gap-2">
                        📦{" "}
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            selectedCategory === category
                              ? "bg-white/20"
                              : "bg-gray-100"
                          }`}
                        >
                          {categoryCount}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {(searchTerm || selectedCategory !== "all") && (
          <div className="mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Active filters:
                </span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25">
                    <Search className="h-4 w-4" />
                    Search: "{searchTerm}"
                    <button
                      onClick={clearSearch}
                      className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25">
                    📦 Category:{" "}
                    {selectedCategory.charAt(0).toUpperCase() +
                      selectedCategory.slice(1)}
                    <button
                      onClick={() => handleCategoryChange("all")}
                      className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Products Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="relative">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 absolute top-0"></div>
              </div>
              <p className="mt-6 text-xl text-gray-600 font-medium">
                Discovering amazing products...
              </p>
              <div className="flex justify-center mt-4 space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedCategory === "all"
                        ? "🌟 All Products"
                        : `📦 ${
                            selectedCategory.charAt(0).toUpperCase() +
                            selectedCategory.slice(1)
                          } Products`}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Showing {filteredProducts.length} of{" "}
                        {allProducts.length} products
                      </span>
                      {searchTerm && (
                        <span className="flex items-center gap-2">
                          <Search className="h-4 w-4 text-blue-500" />
                          Search results for "{searchTerm}"
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-3">
                    <div className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Premium Quality
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500 rounded-lg p-2">
                        <ShoppingBag className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-700">
                          Total Products
                        </p>
                        <p className="text-2xl font-bold text-blue-900">
                          {allProducts.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500 rounded-lg p-2">
                        <Filter className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-purple-700">
                          Categories
                        </p>
                        <p className="text-2xl font-bold text-purple-900">
                          {categories.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 rounded-lg p-2">
                        <Star className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-700">
                          Showing
                        </p>
                        <p className="text-2xl font-bold text-green-900">
                          {filteredProducts.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl"></div>
                <div className="relative">
                  <ProductGrid products={filteredProducts} />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="mx-auto h-32 w-32 text-gray-300 mb-6">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-8 inline-block">
                  <Search className="h-16 w-16 text-gray-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No products found
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                {searchTerm
                  ? `We couldn't find any products matching "${searchTerm}". Try adjusting your search terms.`
                  : "No products found in this category. Try selecting a different category."}
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium text-lg"
              >
                <Sparkles className="h-5 w-5" />
                Explore All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
