import React from "react";
import { Link } from "react-router-dom";
import { Users, Target, Award, Heart } from "lucide-react";
import { scrollToTop } from "../hooks/useScrollToTop";

const AboutPage = () => {
  const stats = [
    { label: "Happy Customers", value: "10,000+" },
    { label: "Products Sold", value: "50,000+" },
    { label: "Years Experience", value: "5+" },
    { label: "Team Members", value: "1+" },
  ];

  const values = [
    {
      icon: Users,
      title: "Customer First",
      description:
        "Tôi ưu tiên nhu cầu và sự hài lòng của khách hàng hơn bất cứ điều gì khác.",
    },
    {
      icon: Target,
      title: "Quality Focus",
      description:
        "Tôi tuyển chọn sản phẩm cẩn thận để đảm bảo tiêu chuẩn chất lượng cao nhất.",
    },
    {
      icon: Award,
      title: "Innovation",
      description:
        "Tôi liên tục đổi mới để mang lại trải nghiệm mua sắm tốt nhất.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "Tôi đam mê kết nối mọi người với những sản phẩm họ yêu thích.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About ShopLongDev
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tôi đang thực hiện giúp việc mua sắm trực tuyến trở nên đơn giản,
              thú vị và dễ dàng cho tất cả mọi người. Niềm đam mê dành cho sản
              phẩm chất lượng và dịch vụ xuất sắc là động lực cho mọi hoạt động
              của chúng tôi.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                ShopLongDev khởi đầu từ một ý tưởng nhỏ nhằm cách mạng hóa cách
                mọi người mua sắm trực tuyến. Chúng tôi nhận thấy nhiều nền tảng
                thương mại điện tử quá phức tạp hoặc không cung cấp đủ sự đa
                dạng mà khách hàng cần.
              </p>
              <p className="text-gray-600 mb-4">
                Ngày nay, Tôi đã phát triển thành một nền tảng đáng tin cậy phục
                vụ hàng ngàn khách hàng trên toàn thế giới. Danh mục sản phẩm
                được tuyển chọn kỹ lưỡng của chúng tôi trải dài trên nhiều danh
                mục, đảm bảo đáp ứng mọi nhu cầu của mọi người.
              </p>
              <p className="text-gray-600">
                Tôi tin rằng mua sắm nên thú vị, dễ dàng và bổ ích. Đó là lý do
                tại sao chúng tôi tiếp tục đổi mới và cải thiện nền tảng của
                mình mỗi ngày.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
                alt="Our team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              Tôi ưu tiên nhu cầu và sự hài lòng của khách hàng hơn bất cứ điều
              gì khác.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of satisfied customers and discover amazing products
            today.
          </p>
          <div className="space-x-4">
            <Link
              to="/products"
              onClick={scrollToTop}
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              to="/contact"
              onClick={scrollToTop}
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
