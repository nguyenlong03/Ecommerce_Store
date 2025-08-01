import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  TrendingUp,
  Users,
  ShoppingBag,
  Star,
  ArrowRight,
  Search,
  Grid,
  List,
  Loader,
} from "lucide-react";
import {
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
} from "../api/Productjs";

const CategoriesPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState({});

  // Category mapping với thông tin bổ sung - chỉ cho những danh mục có thật từ API
  const categoryInfo = React.useMemo(
    () => ({
      electronics: {
        icon: "📱",
        color: "from-purple-500 to-indigo-500",
        description: "Công nghệ tiên tiến và thiết bị điện tử thông minh",
        image:
          "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
        trending: true,
        featured: true,
      },
      jewelery: {
        icon: "💎",
        color: "from-yellow-500 to-amber-500",
        description: "Trang sức và phụ kiện cao cấp",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        trending: true,
        featured: true,
      },
      "men's clothing": {
        icon: "👔",
        color: "from-blue-500 to-cyan-500",
        description: "Bộ sưu tập thời trang nam sang trọng và hiện đại",
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
        trending: false,
        featured: true,
      },
      "women's clothing": {
        icon: "👗",
        color: "from-pink-500 to-rose-500",
        description: "Xu hướng thời trang nữ mới nhất và quyến rũ",
        image:
          "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
        trending: true,
        featured: true,
      },
    }),
    []
  );

  const getCategoryDisplayName = React.useCallback((category) => {
    const displayNames = {
      electronics: "Điện tử",
      jewelery: "Trang sức",
      "men's clothing": "Thời trang Nam",
      "women's clothing": "Thời trang Nữ",
    };
    return displayNames[category] || category;
  }, []);

  // Hàm tạo thông tin mặc định cho category không có trong mapping
  const getDefaultCategoryInfo = React.useCallback(
    (category) => ({
      icon: "📦",
      color: "from-gray-500 to-slate-500",
      description: `Khám phá bộ sưu tập ${getCategoryDisplayName(category)}`,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      trending: false,
      featured: false,
    }),
    [getCategoryDisplayName]
  );

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        setLoading(true);

        // Lấy danh sách categories từ API
        const categoriesResponse = await getAllCategories();
        const categoriesData = categoriesResponse.data || categoriesResponse;

        // Lấy tất cả sản phẩm để đếm số lượng theo category
        const productsResponse = await getAllProducts();
        const productsData = productsResponse.data || productsResponse;

        // Đếm số sản phẩm cho mỗi category
        const categoryCount = {};
        productsData.forEach((product) => {
          const category = product.category;
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        });

        // Chỉ tạo danh sách categories cho những category có thật từ API
        const enrichedCategories = categoriesData
          .filter((category) => categoryCount[category] > 0) // Chỉ lấy category có sản phẩm
          .map((category, index) => ({
            id: index + 1,
            name: category,
            originalName: category,
            displayName: getCategoryDisplayName(category),
            count: categoryCount[category] || 0,
            ...(categoryInfo[category] || getDefaultCategoryInfo(category)),
          }));

        setCategories(enrichedCategories);
        setFilteredCategories(enrichedCategories);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Không thể tải danh mục. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, [categoryInfo, getDefaultCategoryInfo, getCategoryDisplayName]);

  useEffect(() => {
    const filtered = categories.filter(
      (category) =>
        category.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const featuredCategories = categories.filter((cat) => cat.featured);
  const trendingCategories = categories.filter((cat) => cat.trending);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải danh mục...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Có lỗi xảy ra
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
            <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-medium">
              Khám phá danh mục sản phẩm
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Mua sắm theo
            </span>
            <br />
            <span className="text-gray-900">Danh mục yêu thích</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Tìm kiếm sản phẩm hoàn hảo trong bộ sưu tập đa dạng của chúng tôi.
            Từ thời trang đến công nghệ, chúng tôi có tất cả những gì bạn cần.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm danh mục..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 shadow-lg"
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Featured Categories */}
        {featuredCategories.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Star className="h-6 w-6 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                Danh mục nổi bật
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredCategories.slice(0, 4).map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${encodeURIComponent(
                    category.originalName
                  )}`}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.displayName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="font-bold text-lg mb-1">
                      {category.displayName}
                    </h3>
                    <p className="text-sm opacity-90">
                      {category.count} sản phẩm
                    </p>
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Trending Categories */}
        {trendingCategories.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <TrendingUp className="h-6 w-6 text-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                Xu hướng hiện tại
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingCategories.map((category, index) => (
                <Link
                  key={category.id}
                  to={`/products?category=${encodeURIComponent(
                    category.originalName
                  )}`}
                  className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <img
                    src={category.image}
                    alt={category.displayName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-90 transition-opacity`}
                  ></div>

                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{category.icon}</span>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-sm font-medium">Trending</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {category.displayName}
                      </h3>
                      <p className="text-sm opacity-90 mb-3">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          {category.count} sản phẩm
                        </span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Categories */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Tất cả danh mục
            </h2>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="h-5 w-5" />
              <span>{filteredCategories.length} danh mục</span>
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy danh mục
              </h3>
              <p className="text-gray-600">Thử thay đổi từ khóa tìm kiếm</p>
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/products?category=${encodeURIComponent(
                        category.originalName
                      )}`}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden card-hover"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.displayName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl">{category.icon}</span>
                          {category.trending && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                              Hot
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {category.displayName}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {category.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {category.count} sản phẩm
                          </span>
                          <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                            <span className="text-sm mr-1">Xem ngay</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/products?category=${encodeURIComponent(
                        category.originalName
                      )}`}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex items-center gap-6"
                    >
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={category.image}
                          alt={category.displayName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{category.icon}</span>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {category.displayName}
                          </h3>
                          {category.trending && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                              Hot
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 mb-3">
                          {category.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {category.count} sản phẩm
                          </span>
                          <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                            <span className="mr-2">Khám phá ngay</span>
                            <ArrowRight className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        {/* Call to Action */}
        <section className="mt-20">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <ShoppingBag className="h-5 w-5 mr-2" />
                <span className="font-medium">Không tìm thấy gì phù hợp?</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Khám phá toàn bộ bộ sưu tập
              </h2>

              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Duyệt qua hàng nghìn sản phẩm chất lượng cao hoặc sử dụng tính
                năng tìm kiếm để tìm chính xác những gì bạn cần.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="inline-flex items-center bg-white text-blue-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Xem tất cả sản phẩm
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Liên hệ hỗ trợ
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoriesPage;
