import React from "react";
import {
  X,
  Package,
  DollarSign,
  Tag,
  Star,
  Users,
  Calendar,
  Edit,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

const ProductDetail = ({ product, isOpen, onClose, onEdit }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Chi tiết sản phẩm
              </h2>
              <p className="text-sm text-gray-500">ID: {product.id}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(product)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Chỉnh sửa</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image and Basic Info */}
            <div className="space-y-6">
              {/* Product Image */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2 text-gray-600" />
                  Hình ảnh sản phẩm
                </h3>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-80 object-cover rounded-lg shadow-sm"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/320";
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg shadow-sm">
                    <span className="text-xs text-gray-600">#{product.id}</span>
                  </div>
                </div>
              </div>

              {/* Product Name and Category */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-gray-600" />
                  Thông tin cơ bản
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Tên sản phẩm
                    </label>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      {product.title}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Danh mục
                    </label>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <Tag className="h-3 w-3 mr-1" />
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Price and Rating */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-gray-600" />
                  Giá và đánh giá
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-500">Giá bán</p>
                        <p className="text-2xl font-bold text-green-600">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Star className="h-8 w-8 text-yellow-500" />
                      <div>
                        <p className="text-sm text-gray-500">Đánh giá</p>
                        <div className="flex items-center space-x-1">
                          <p className="text-2xl font-bold text-gray-900">
                            {product.rating?.rate || "N/A"}
                          </p>
                          {product.rating?.rate && (
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating.rate)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {product.rating?.count && (
                  <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">
                          Số lượt đánh giá
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {product.rating.count} người đã đánh giá
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-gray-600" />
                  Mô tả sản phẩm
                </h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-600" />
                  Thông tin bổ sung
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Trạng thái kho
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          (product.rating?.count || 0) > 100
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {(product.rating?.count || 0) > 100
                          ? "Còn hàng"
                          : "Ít hàng"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Độ phổ biến</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${Math.min(
                                ((product.rating?.count || 0) / 200) * 100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {Math.min(
                            Math.round(
                              ((product.rating?.count || 0) / 200) * 100
                            ),
                            100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        URL hình ảnh
                      </span>
                      <a
                        href={product.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-xs truncate max-w-32"
                        title={product.image}
                      >
                        Xem ảnh gốc
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Đóng
          </button>
          <button
            onClick={() => onEdit(product)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Chỉnh sửa sản phẩm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
