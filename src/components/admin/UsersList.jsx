import React, { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Eye,
  Plus,
  Search,
  Filter,
  UserPlus,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { getAllUsers, deleteUser } from "../../api/Users";
import { toast } from "react-toastify";
import { data } from "autoprefixer";

const UsersList = ({ onEdit, onView, onAdd }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filterUsers = () => {
      let filtered = [...users];

      // Apply search filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        filtered = filtered.filter(
          (user) =>
            user.username?.toLowerCase().includes(query) ||
            user.email?.toLowerCase().includes(query) ||
            user.name?.firstname?.toLowerCase().includes(query) ||
            user.name?.lastname?.toLowerCase().includes(query)
        );
      }

      // Apply category filter (you can extend this)
      if (filterBy !== "all") {
        // Add filter logic here if needed
      }

      setFilteredUsers(filtered);
    };

    filterUsers();
  }, [users, searchTerm, filterBy]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await getAllUsers();
      console.log("check uselisst", usersData);
      setUsers(usersData || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Lỗi khi tải danh sách người dùng");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId, username) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${username}"?`)) {
      try {
        await deleteUser(userId);
        toast.success("Xóa người dùng thành công");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Lỗi khi xóa người dùng");
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm sm:text-base text-gray-600">
            Đang tải...
          </span>
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
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
                Quản lý người dùng
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">
                Tổng cộng {filteredUsers.length} người dùng
              </p>
            </div>

            <button
              onClick={onAdd}
              className="inline-flex items-center justify-center px-3 py-2 sm:px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm lg:text-base"
            >
              <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Thêm người dùng</span>
              <span className="xs:hidden">Thêm</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm lg:text-base"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="pl-8 sm:pl-10 pr-6 sm:pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm lg:text-base min-w-[100px] sm:min-w-[120px]"
              >
                <option value="all">Tất cả</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users List - Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Người dùng
              </th>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thông tin liên hệ
              </th>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Địa chỉ
              </th>
              <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-4 xl:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 xl:w-10 xl:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.name?.firstname?.charAt(0)?.toUpperCase() ||
                        user.username?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="ml-3 xl:ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name?.firstname} {user.name?.lastname}
                      </div>
                      <div className="text-sm text-gray-500">
                        @{user.username}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-900">
                      <Mail className="h-3 w-3 xl:h-4 xl:w-4 mr-2 text-gray-400" />
                      <span className="truncate max-w-[200px]">
                        {user.email}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-3 w-3 xl:h-4 xl:w-4 mr-2 text-gray-400" />
                      {user.phone}
                    </div>
                  </div>
                </td>

                <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <MapPin className="h-3 w-3 xl:h-4 xl:w-4 mr-2 text-gray-400" />
                    <div>
                      <div className="truncate max-w-[150px]">
                        {user.address?.street} {user.address?.number}
                      </div>
                      <div className="text-gray-500 truncate max-w-[150px]">
                        {user.address?.city}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Hoạt động
                  </span>
                </td>

                <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-1 xl:space-x-2">
                    <button
                      onClick={() => onView(user)}
                      className="p-1.5 xl:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye className="h-3 w-3 xl:h-4 xl:w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(user)}
                      className="p-1.5 xl:p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit className="h-3 w-3 xl:h-4 xl:w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.username)}
                      className="p-1.5 xl:p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

      {/* Users List - Mobile Cards */}
      <div className="lg:hidden">
        <div className="divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="p-3 sm:p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 text-sm sm:text-base">
                  {user.name?.firstname?.charAt(0)?.toUpperCase() ||
                    user.username?.charAt(0)?.toUpperCase()}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                        {user.name?.firstname} {user.name?.lastname}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        @{user.username}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800 ml-2 whitespace-nowrap">
                      Hoạt động
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <Mail className="h-3 w-3 mr-2 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <Phone className="h-3 w-3 mr-2 text-gray-400 flex-shrink-0" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <MapPin className="h-3 w-3 mr-2 text-gray-400 flex-shrink-0" />
                      <span className="truncate">
                        {user.address?.street} {user.address?.number},{" "}
                        {user.address?.city}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end space-x-1 mt-3">
                    <button
                      onClick={() => onView(user)}
                      className="inline-flex items-center px-2 py-1 text-xs text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Xem
                    </button>
                    <button
                      onClick={() => onEdit(user)}
                      className="inline-flex items-center px-2 py-1 text-xs text-green-600 bg-green-50 rounded hover:bg-green-100 transition-colors"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.username)}
                      className="inline-flex items-center px-2 py-1 text-xs text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && !loading && (
        <div className="text-center py-8 sm:py-12">
          <div className="text-gray-500">
            <UserPlus className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-base sm:text-lg font-medium text-gray-900">
              Không tìm thấy người dùng
            </p>
            <p className="text-sm sm:text-base text-gray-500 mt-1">
              {searchTerm
                ? "Thử thay đổi từ khóa tìm kiếm"
                : "Chưa có người dùng nào trong hệ thống"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
