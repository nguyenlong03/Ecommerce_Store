import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  Star,
  DollarSign,
} from "lucide-react";
import { getAllProducts, deleteProduct } from "../../api/Products";
import { toast } from "react-toastify";

const ProductsList = ({ onEdit, onView, onAdd }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  // Load products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const result = await getAllProducts();
      if (result.success) {
        setProducts(result.data || []);
      } else {
        toast.error(result.error);
        setProducts([]);
      }
    } catch (error) {
      toast.error("Lỗi khi tải danh sách sản phẩm");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete product
  const handleDelete = async (id, title) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${title}"?`)) {
      try {
        const result = await deleteProduct(id);
        if (result.success) {
          toast.success("Xóa sản phẩm thành công");
          loadProducts();
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error("Lỗi khi xóa sản phẩm");
      }
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = !filterCategory || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case "title":
          aVal = a.title || "";
          bVal = b.title || "";
          break;
        case "price":
          aVal = a.price || 0;
          bVal = b.price || 0;
          break;
        case "rating":
          aVal = a.rating?.rate || 0;
          bVal = b.rating?.rate || 0;
          break;
        default:
          aVal = a.id || 0;
          bVal = b.id || 0;
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm sm:text-base text-gray-600">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200">
        <div className="flex flex-col space-y-3 sm:space-y-4">
          {/* Title and Add Button */}
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 flex items-center">
                <Package className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600" />
                Quản lý sản phẩm
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">
                Tổng cộng {filteredProducts.length} sản phẩm
              </p>
            </div>

            <button
              onClick={onAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors text-xs sm:text-sm lg:text-base"
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Thêm sản phẩm</span>
              <span className="xs:hidden">Thêm</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm lg:text-base"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col xs:flex-row gap-2">
              {/* Category Filter */}
              <div className="relative flex-1 xs:flex-none">
                <Filter className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-6 sm:pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm lg:text-base xs:min-w-[150px]"
                >
                  <option value="">Tất cả danh mục</option>
                  {Array.from(new Set(products.map((p) => p.category))).map(
                    (category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Sort Controls */}
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 xs:flex-none px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm lg:text-base"
                >
                  <option value="id">ID</option>
                  <option value="title">Tên</option>
                  <option value="price">Giá</option>
                  <option value="rating">Đánh giá</option>
                </select>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="flex-1 xs:flex-none px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm lg:text-base"
                >
                  <option value="asc">Tăng dần</option>
                  <option value="desc">Giảm dần</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table - Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sản phẩm
              </th>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Danh mục
              </th>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giá
              </th>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đánh giá
              </th>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kho
              </th>
              <th className="px-4 xl:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 xl:px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 xl:h-12 xl:w-12 flex-shrink-0">
                      <img
                        className="h-10 w-10 xl:h-12 xl:w-12 rounded-lg object-cover"
                        src={product.image}
                        alt={product.title}
                        onError={(e) => {
                          e.target.src = "/api/placeholder/48/48";
                        }}
                      />
                    </div>
                    <div className="ml-3 xl:ml-4">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2 max-w-[200px]">
                        {product.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {product.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm font-medium text-gray-900">
                    <DollarSign className="h-3 w-3 xl:h-4 xl:w-4 text-green-500 mr-1" />
                    {product.price}
                  </div>
                </td>
                <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 xl:h-4 xl:w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-900">
                      {product.rating?.rate || "N/A"}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.rating?.count || 0})
                    </span>
                  </div>
                </td>
                <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
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
                </td>
                <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-1 xl:space-x-2">
                    <button
                      onClick={() => onView(product)}
                      className="text-blue-600 hover:text-blue-900 p-1.5 xl:p-2 rounded hover:bg-blue-50 transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye className="h-3 w-3 xl:h-4 xl:w-4" />
                    </button>

                    <button
                      onClick={() => onEdit(product)}
                      className="text-green-600 hover:text-green-900 p-1.5 xl:p-2 rounded hover:bg-green-50 transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit className="h-3 w-3 xl:h-4 xl:w-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(product.id, product.title)}
                      className="text-red-600 hover:text-red-900 p-1.5 xl:p-2 rounded hover:bg-red-50 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="h-3 w-3 xl:h-4 xl:w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Products Cards - Mobile */}
      <div className="lg:hidden">
        <div className="divide-y divide-gray-200">
          {filteredProducts.map((product) => (
            <div key={product.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
              <div className="flex space-x-3">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover"
                    src={product.image}
                    alt={product.title}
                    onError={(e) => {
                      e.target.src = "/api/placeholder/64/64";
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        ID: {product.id}
                      </p>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="mt-2 space-y-2">
                    {/* Category */}
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </div>

                    {/* Price and Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm sm:text-base font-medium text-gray-900">
                        <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
                        {product.price}
                      </div>

                      <div className="flex items-center">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 mr-1" />
                        <span className="text-xs sm:text-sm text-gray-900">
                          {product.rating?.rate || "N/A"}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.rating?.count || 0})
                        </span>
                      </div>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          (product.rating?.count || 0) > 100
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {(product.rating?.count || 0) > 100
                          ? "Còn hàng"
                          : "Ít hàng"}
                      </span>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => onView(product)}
                          className="inline-flex items-center px-2 py-1 text-xs text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Xem
                        </button>
                        <button
                          onClick={() => onEdit(product)}
                          className="inline-flex items-center px-2 py-1 text-xs text-green-600 bg-green-50 rounded hover:bg-green-100 transition-colors"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.title)}
                          className="inline-flex items-center px-2 py-1 text-xs text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-8 sm:py-12">
          <Package className="h-8 w-8 sm:h-12 sm:w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            Không có sản phẩm nào
          </h3>
          <p className="text-sm sm:text-base text-gray-500">
            {searchTerm || filterCategory
              ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
              : "Chưa có sản phẩm nào trong hệ thống"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
