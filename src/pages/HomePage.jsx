import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Star,
  ShoppingBag,
  Users,
  Award,
  Truck,
} from "lucide-react";
import ProductGrid from "../components/products/ProductGrid";
import { getAllProducts } from "../api/Productjs";
import { scrollToTop } from "../hooks/useScrollToTop";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        const allProducts = response.data || response;
        setProducts(allProducts);
        // Lấy 8 sản phẩm đầu tiên làm featured products
        setFeaturedProducts(allProducts.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="pt-16">
      {" "}
      {/* Add padding top for fixed navbar */}
      {/* Hero Section với gradient và animation */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background với gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-gradient-x"></div>

        {/* Floating shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Khám phá thế giới
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Mua sắm trực tuyến
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Hàng nghìn sản phẩm chất lượng cao với giá tốt nhất. Mua sắm dễ
              dàng, giao hàng nhanh chóng!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                to="/products"
                onClick={scrollToTop}
                className="group px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <ShoppingBag className="mr-2 h-6 w-6" />
                Khám phá ngay
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/categories"
                onClick={scrollToTop}
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Xem danh mục
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">
                  10K+
                </div>
                <div className="text-white/80">Sản phẩm</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">
                  50K+
                </div>
                <div className="text-white/80">Khách hàng</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">
                  4.9★
                </div>
                <div className="text-white/80">Đánh giá</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full p-1">
            <div className="w-1 h-3 bg-white rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm mua sắm tuyệt vời nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck className="h-8 w-8" />,
                title: "Giao hàng nhanh",
                description:
                  "Giao hàng trong 24h tại TP.HCM và 2-3 ngày toàn quốc",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Chất lượng đảm bảo",
                description:
                  "100% sản phẩm chính hãng với chế độ bảo hành tốt nhất",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Hỗ trợ 24/7",
                description:
                  "Đội ngũ tư vấn nhiệt tình, sẵn sàng hỗ trợ mọi lúc",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Ưu đãi hấp dẫn",
                description:
                  "Nhiều chương trình khuyến mãi và tích điểm thành viên",
                color: "from-orange-500 to-red-500",
              },
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sản phẩm nổi bật
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Khám phá những sản phẩm được yêu thích nhất
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="mb-12">
              <ProductGrid products={featuredProducts} />
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          <div className="text-center">
            <Link
              to="/products"
              onClick={scrollToTop}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Xem tất cả sản phẩm
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Đăng ký nhận tin khuyến mãi
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Nhận thông báo về các ưu đãi đặc biệt và sản phẩm mới nhất
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-6 py-3 rounded-full border-0 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Đăng ký
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
