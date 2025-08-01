import React, { useState, useEffect } from 'react';
import { X, Upload, Package, DollarSign, Tag, FileText, Image as ImageIcon } from 'lucide-react';
import { createProduct, updateProduct } from '../../api/Products';
import { toast } from 'react-toastify';

const ProductForm = ({ product, isOpen, onClose, onSave, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Predefined categories
  const categories = [
    "men's clothing",
    "women's clothing", 
    "jewelery",
    "electronics"
  ];

  // Initialize form data when product changes
  useEffect(() => {
    if (mode === 'edit' && product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        category: product.category || '',
        image: product.image || '',
        rating: {
          rate: product.rating?.rate || 0,
          count: product.rating?.count || 0
        }
      });
    } else {
      // Reset form for add mode
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        image: '',
        rating: {
          rate: 0,
          count: 0
        }
      });
    }
    setErrors({});
  }, [product, mode, isOpen]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('rating.')) {
      const ratingField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        rating: {
          ...prev.rating,
          [ratingField]: ratingField === 'rate' ? parseFloat(value) || 0 : parseInt(value) || 0
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tên sản phẩm là bắt buộc';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Mô tả sản phẩm là bắt buộc';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Giá sản phẩm phải lớn hơn 0';
    }

    if (!formData.category) {
      newErrors.category = 'Danh mục là bắt buộc';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Hình ảnh sản phẩm là bắt buộc';
    } else {
      // Basic URL validation
      try {
        new URL(formData.image);
      } catch {
        newErrors.image = 'URL hình ảnh không hợp lệ';
      }
    }

    if (formData.rating.rate < 0 || formData.rating.rate > 5) {
      newErrors['rating.rate'] = 'Đánh giá phải từ 0 đến 5';
    }

    if (formData.rating.count < 0) {
      newErrors['rating.count'] = 'Số lượng đánh giá không được âm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Prepare data for API
      const productData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      let result;
      if (mode === 'edit' && product?.id) {
        result = await updateProduct(product.id, productData);
      } else {
        result = await createProduct(productData);
      }

      if (result.success) {
        toast.success(mode === 'edit' ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!');
        onSave(result.data);
        onClose();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi lưu sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {mode === 'edit' ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
              </h2>
              <p className="text-sm text-gray-500">
                {mode === 'edit' ? 'Cập nhật thông tin sản phẩm' : 'Điền thông tin sản phẩm mới'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Package className="h-4 w-4 inline mr-1" />
              Tên sản phẩm *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Nhập tên sản phẩm"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="h-4 w-4 inline mr-1" />
              Mô tả sản phẩm *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Nhập mô tả chi tiết sản phẩm"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Price and Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="h-4 w-4 inline mr-1" />
                Giá sản phẩm ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.price ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="h-4 w-4 inline mr-1" />
                Danh mục *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.category ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Chọn danh mục</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <ImageIcon className="h-4 w-4 inline mr-1" />
              URL hình ảnh *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.image ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
            
            {/* Image Preview */}
            {formData.image && !errors.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Rating Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Đánh giá sản phẩm</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rating Score */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Điểm đánh giá (0-5)
                </label>
                <input
                  type="number"
                  name="rating.rate"
                  value={formData.rating.rate}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors['rating.rate'] ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="4.5"
                />
                {errors['rating.rate'] && <p className="mt-1 text-sm text-red-600">{errors['rating.rate']}</p>}
              </div>

              {/* Rating Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượng đánh giá
                </label>
                <input
                  type="number"
                  name="rating.count"
                  value={formData.rating.count}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors['rating.count'] ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="120"
                />
                {errors['rating.count'] && <p className="mt-1 text-sm text-red-600">{errors['rating.count']}</p>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <span>{mode === 'edit' ? 'Cập nhật' : 'Thêm sản phẩm'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
