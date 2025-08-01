import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <Link to="/" className="flex items-center space-x-3 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    ShopLongDev
                  </span>
                </Link>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Nền tảng thương mại điện tử hàng đầu Việt Nam, mang đến trải
                nghiệm mua sắm tuyệt vời với hàng nghìn sản phẩm chất lượng.
              </p>

              {/* Social Media */}
              <div>
                <h4 className="font-semibold mb-4 text-lg">
                  Theo dõi chúng tôi
                </h4>
                <div className="flex space-x-4">
                  {[
                    {
                      icon: Facebook,
                      color: "hover:bg-blue-600",
                      label: "Facebook",
                    },
                    {
                      icon: Instagram,
                      color: "hover:bg-pink-600",
                      label: "Instagram",
                    },
                    {
                      icon: Twitter,
                      color: "hover:bg-blue-400",
                      label: "Twitter",
                    },
                    {
                      icon: Youtube,
                      color: "hover:bg-red-600",
                      label: "Youtube",
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`p-3 bg-gray-800 rounded-lg ${social.color} text-white transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Liên kết nhanh
              </h4>
              <div className="space-y-3">
                {[
                  { to: "/", label: "Trang chủ" },
                  { to: "/products", label: "Sản phẩm" },
                  { to: "/categories", label: "Danh mục" },
                  { to: "/about", label: "Giới thiệu" },
                  { to: "/contact", label: "Liên hệ" },
                ].map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Customer Service */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Hỗ trợ khách hàng
              </h4>
              <div className="space-y-3">
                {[
                  "Chính sách đổi trả",
                  "Hướng dẫn mua hàng",
                  "Phương thức thanh toán",
                  "Câu hỏi thường gặp",
                  "Chính sách bảo mật",
                ].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Thông tin liên hệ
              </h4>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">
                      Hoàng Mai
                      <br />
                      Hà Nội, Việt Nam
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-400" />
                  <a
                    href="tel:+84123456789"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    +84 123 456 789
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-purple-400" />
                  <a
                    href="mailto:contact@shoplongdev.com"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    contact@shoplongdev.com
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-white/10">
                <h5 className="font-semibold mb-3">Đăng ký nhận tin</h5>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700"></div>

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © {currentYear} ShopLongDev.
              <span className="inline-flex items-center ml-1">
                Được tạo với <Heart className="h-4 w-4 text-red-500 mx-1" /> tại
                Việt Nam
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                Điều khoản sử dụng
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                Chính sách riêng tư
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </footer>
  );
};

export default Footer;
