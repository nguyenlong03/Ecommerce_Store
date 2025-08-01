import React from "react";
import { Link } from "react-router-dom";
import { Users, Target, Award, Heart } from "lucide-react";

const AboutPage = () => {
  const stats = [
    { label: "Happy Customers", value: "10,000+" },
    { label: "Products Sold", value: "50,000+" },
    { label: "Years Experience", value: "5+" },
    { label: "Team Members", value: "25+" }
  ];

  const values = [
    {
      icon: Users,
      title: "Customer First",
      description: "We prioritize our customers' needs and satisfaction above everything else."
    },
    {
      icon: Target,
      title: "Quality Focus",
      description: "We carefully curate our products to ensure the highest quality standards."
    },
    {
      icon: Award,
      title: "Innovation",
      description: "We continuously innovate to provide the best shopping experience."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We are passionate about connecting people with products they love."
    }
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
              We're on a mission to make online shopping simple, enjoyable, and accessible to everyone. 
              Our passion for quality products and exceptional service drives everything we do.
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
                <div className="text-blue-100">
                  {stat.label}
                </div>
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
                Founded in 2019, ShopLongDev started as a small idea to revolutionize 
                the way people shop online. We noticed that many e-commerce platforms 
                were either too complicated or didn't offer the variety customers needed.
              </p>
              <p className="text-gray-600 mb-4">
                Today, we've grown into a trusted platform serving thousands of customers 
                worldwide. Our carefully curated selection of products spans across 
                multiple categories, ensuring there's something for everyone.
              </p>
              <p className="text-gray-600">
                We believe that shopping should be fun, easy, and rewarding. That's why 
                we continue to innovate and improve our platform every day.
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
              The principles that guide everything we do
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
                <p className="text-gray-600">
                  {value.description}
                </p>
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
            Join thousands of satisfied customers and discover amazing products today.
          </p>
          <div className="space-x-4">
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              to="/contact"
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
