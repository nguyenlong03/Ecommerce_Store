import React from 'react';
import { X, Mail, Phone, MapPin, User, Calendar, Shield } from 'lucide-react';

const UserDetail = ({ user, isOpen, onClose, onEdit }) => {
  if (!isOpen || !user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Không có thông tin';
    try {
      return new Date(dateString).toLocaleDateString('vi-VN');
    } catch {
      return 'Không có thông tin';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Chi tiết người dùng</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(user)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Chỉnh sửa
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name?.firstname?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {user.name?.firstname} {user.name?.lastname}
              </h3>
              <p className="text-gray-600">@{user.username}</p>
              <div className="flex items-center mt-2">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Hoạt động
                </span>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
              <User className="h-5 w-5" />
              <span>Thông tin cơ bản</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">ID</label>
                <p className="text-gray-900 font-mono">#{user.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Username</label>
                <p className="text-gray-900">@{user.username}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Tên</label>
                <p className="text-gray-900">{user.name?.firstname || 'Không có'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Họ</label>
                <p className="text-gray-900">{user.name?.lastname || 'Không có'}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
              <Mail className="h-5 w-5" />
              <span>Thông tin liên hệ</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{user.email || 'Không có'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-gray-500">Số điện thoại</label>
                  <p className="text-gray-900">{user.phone || 'Không có'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
              <MapPin className="h-5 w-5" />
              <span>Địa chỉ</span>
            </div>
            {user.address ? (
              <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Thành phố</label>
                    <p className="text-gray-900">{user.address.city || 'Không có'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Đường</label>
                    <p className="text-gray-900">{user.address.street || 'Không có'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Số nhà</label>
                    <p className="text-gray-900">{user.address.number || 'Không có'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Mã bưu chính</label>
                    <p className="text-gray-900">{user.address.zipcode || 'Không có'}</p>
                  </div>
                </div>
                
                {user.address.geolocation && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-500 mb-2">Tọa độ địa lý</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-gray-500">Vĩ độ:</span>
                        <p className="text-gray-900 font-mono">{user.address.geolocation.lat || 'Không có'}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Kinh độ:</span>
                        <p className="text-gray-900 font-mono">{user.address.geolocation.long || 'Không có'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 italic">Chưa có thông tin địa chỉ</p>
            )}
          </div>

          {/* Security Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
              <Shield className="h-5 w-5" />
              <span>Bảo mật</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500">Mật khẩu</label>
                <p className="text-gray-900">••••••••</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Trạng thái tài khoản</label>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Đã kích hoạt
                </span>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
              <Calendar className="h-5 w-5" />
              <span>Thống kê tài khoản</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-gray-500">Đơn hàng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">$0</div>
                <div className="text-sm text-gray-500">Tổng chi tiêu</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-gray-500">Điểm tích lũy</div>
              </div>
            </div>
          </div>

          {/* Raw Data (for development) */}
          <details className="bg-gray-50 rounded-lg p-4">
            <summary className="cursor-pointer text-gray-700 font-medium">
              Dữ liệu thô (Developer)
            </summary>
            <pre className="mt-3 text-xs bg-gray-100 p-3 rounded overflow-x-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
