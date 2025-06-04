import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-gray-900">
      {/* Hero image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://dony.vn/wp-content/uploads/2021/08/mau-thiet-ke-shop-quan-ao-nam-dep-1.jpg"
          alt="Elegant shopping experience"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Discover Premium Quality Products
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Shop the latest trends with confidence. Free shipping on orders over
            $100.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/products?category=featured"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-gray-900 transition-colors"
            >
              View Featured
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
